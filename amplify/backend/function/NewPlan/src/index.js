const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb')
const { v4: uuidv4 } = require('uuid')
const { getMealPlan, getWorkoutPlan } = require('./plan.service')

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

let tableName = 'planTable'
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify('HTTP method not allowed'),
    }
  }

  if (event.path !== '/plan/new') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify('Resource path not allowed'),
    }
  }

  const { userId, params } = JSON.parse(event.body)
  const planId = uuidv4()

  try {
    const mealPlan = await getMealPlan(params)
    const workoutPlan = await getWorkoutPlan(params)

    const planItem = {
      planId,
      userId,
      params,
      plan: { meal: mealPlan, workout: workoutPlan },
      createdAt: String(new Date()),
    }

    const putItemParams = {
      TableName: tableName,
      Item: planItem,
    }

    try {
      const data = await ddbDocClient.send(new PutCommand(putItemParams))
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ...planItem }),
      }
    } catch (err) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ params, error: err }),
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ params, error: String(err) }),
    }
  }
}
