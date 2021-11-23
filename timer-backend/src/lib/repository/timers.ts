import { GeneratedTimer } from '../../models/GeneratedTimer';
import { Converter, GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { DynamoDB } from 'aws-sdk';
import { logger } from '../../utils/logging';

const dynamoDb = new DynamoDB({
  endpoint: process.env.DYNAMODB_ENDPOINT!,
  region: process.env.AWS_REGION!,
});

export const persistTimer = async (timer: GeneratedTimer): Promise<GeneratedTimer> => {
  await dynamoDb
    .putItem({
      TableName: process.env.TIMER_TABLE!,
      Item: Converter.marshall(timer),
    })
    .promise();

  return timer;
};

export const deleteTimer = async (id: string): Promise<void> => {
  await dynamoDb
    .deleteItem({
      TableName: process.env.TIMER_TABLE!,
      Key: { id: { S: id } },
    })
    .promise();
};

export const getTimer = async (id: string): Promise<GeneratedTimer | null> => {
  return dynamoDb
    .getItem({
      TableName: process.env.TIMER_TABLE!,
      Key: { id: { S: id } },
    })
    .promise()
    .then(async (data: GetItemOutput) => {
      const { Item } = data;

      if (!Item) {
        return null;
      }

      const generatedTimer = Converter.unmarshall(Item);
      logger.log(`Fetched generatedTimer successfully: ${JSON.stringify(generatedTimer)}`);
      return generatedTimer as GeneratedTimer;
    });
};
