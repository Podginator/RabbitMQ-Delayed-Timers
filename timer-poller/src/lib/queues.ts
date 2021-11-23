import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ampq from 'amqplib';
import { backOff } from "exponential-backoff";
import { InvokableUrl } from "../model/InvokableUrl";

let connection: ampq.Connection | null;

const getConnection = async () => {
    if (!connection) {
        // backoff and retry the connection
        const connect = () => {
            return ampq.connect(process.env.RABBIT_MQ_URL!).then((connection) => {
                console.log(`Connected to Rabbit MQ.`)
                return connection;
            })
            .catch(err => {
                console.log(`Error encountered while connecting, retrying...`);
                throw err;
            })
        };
        connection = await backOff(connect, { numOfAttempts : 10});
    }

    return connection;
}

const getLatestMessagesObserver = async (queueName: string): Promise<Observable<ampq.Message>> => {
    const connection = await getConnection();
    const channel = await connection!.createChannel();
    await channel.assertQueue(queueName);
    return new Observable(subscriber => {
        channel.consume(queueName, message => {
            if (message) {
                subscriber.next(message);
            }
        }, { noAck: true });
    });
};

const convertToInvokableUrl = (message: ampq.Message): InvokableUrl => {
    const json = message.content.toString('utf-8');
    console.log(`Message Received: ${json}`);
    return JSON.parse(json) as InvokableUrl;
}

export const messageStream = async (queueName: string) => {
    return (await getLatestMessagesObserver(queueName))
        .pipe(
            map(convertToInvokableUrl)
        );
}