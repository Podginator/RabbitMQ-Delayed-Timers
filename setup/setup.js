const AWS = require('aws-sdk');

(async () => {
  const dynamoDb = new AWS.DynamoDB({ region: 'eu-west-1', endpoint: 'http://localhost:4566', credentials: {
      accessKeyId: 'abc',
      secretAccessKey: 'doesntmatter',
    } });

  let existingTable;
  try {
    existingTable = await dynamoDb.describeTable({ TableName: 'timers' }).promise();
  } catch (e) {
    console.log("Table does not exist")
  }

  if (!existingTable) {
    await dynamoDb.createTable({
      TableName: 'timers',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    }).promise();
  }
})();