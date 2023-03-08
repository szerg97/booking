import { Log } from '../log/log';
import { NatsMessage } from '../nats/nats-message';

export const mapFromNatsMessageToLog = (data: NatsMessage): Log => {
    return {
        timestamp: data.timestamp,
        payload: data.payload,
    };
};
