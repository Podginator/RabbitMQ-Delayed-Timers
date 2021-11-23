import amqplib from 'amqplib';
import { logger } from '../../utils/logging';
import { GeneratedTimer } from '../../models/GeneratedTimer';

const { RABBIT_MQ_URL } = process.env;

let connection: amqplib.Connection;

const getConnection = async () => {
  if (!connection) {
    connection = await amqplib.connect(RABBIT_MQ_URL!);
    // The default behaviour here is to exit the process. We should alter this and just throw an error.
    // In the future we should also consider how to reconnect if we have disconnected.
    connection.on('error', (err) => {
      logger.error(`An error occured on the rabbitMQ Connection ${err}`);
    });
  }

  return connection;
};

export const enqueueTimer = async (message: GeneratedTimer): Promise<GeneratedTimer> => {
  const connection = await getConnection();
  const confirmationChannel = await connection.createConfirmChannel();

  const invokableUrl = { id: message.id, url: message.url };
  const expiration = Math.max(0, message.epochSend - message.epochPublished);
  try {
    confirmationChannel.publish('timers.exchange', 'timers.delay', Buffer.from(JSON.stringify(invokableUrl)), { expiration });
    await confirmationChannel.waitForConfirms();
  } catch (e) {
    throw e;
  }

  return message;
};
