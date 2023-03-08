import { connect } from 'nats';
import dotenv from 'dotenv';

dotenv.config();

const options = {
    servers: [
        process.env.NATS_SERVER_LOCAL_1!,
        process.env.NATS_SERVER_LOCAL_2!,
        process.env.NATS_SERVER_LOCAL_3!,
    ],
};

export const connectToNats = async () => {
    try {
        console.log(
            `[NATS]> Establishing connection to NATS at the following servers of the cluster: [${options.servers}]`
        );
        return await connect(options);
    } catch (err) {
        console.log(`\x1B[33m[NATS]> Couldn't connect to ${options.servers}`);
    }
};
