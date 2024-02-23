/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb')

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

let tableName = 'MealAndDietPlanTable'
if (process.env.ENV && process.env.ENV !== 'NONE') {
  tableName = tableName + '-' + process.env.ENV
}

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`)
  let result = { ...event, res: 'Hello from Lambda!' }
  let statusCode = 200

  const putItemParams = {
    TableName: tableName,
    Item: event,
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
