const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb')

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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify('HTTP method not allowed'),
    }
  }

  if (event.path !== '/plan/list') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify('Resource path not allowed'),
    }
  }

  const { userId } = event.queryStringParameters

  try {
    const scanItemsParams = {
      TableName: tableName,
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      FilterExpression: 'userId = :userId',
    }
    try {
      const { Items } = await ddbDocClient.send(new ScanCommand(scanItemsParams))
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ userId, plans: [...Items] }),
      }
    } catch (err) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: err }),
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
