const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb')
const { v4: uuidv4 } = require('uuid')

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
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: JSON.stringify('HTTP method not allowed'),
    }
  }

  if (event.path !== '/plan/new') {
    return {
      statusCode: 400,
      body: JSON.stringify('Resource path not allowed'),
    }
  }

  const { userId, params } = JSON.parse(event.body)
  const planId = uuidv4()
  const planItem = { planId, userId, params, plan: { meal: 'eat regularly' } }

  let result = { ...planItem, res: 'Hello from New Plan lambda!' }
  let statusCode = 200

  const putItemParams = {
    TableName: tableName,
    Item: planItem,
  }

  try {
    const data = await ddbDocClient.send(new PutCommand(putItemParams))
    result = { ...result, data: data, success: 'post call succeed!' }
  } catch (err) {
    statusCode = 500
    result = { ...result, error: err }
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(result),
  }
}
