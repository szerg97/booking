export enum Constants {
    NATS_LOG_INIT = '[NATS]> Initializing NATS ...',
    NATS_LOG_INITED = '[NATS]> Connection Already Initialized',
    NATS_LOG_CLOSED = '[NATS]> Subscription closed',
    NATS_LOG_STREAMS = '\x1B[33m[NATS]> Streams already exist: ',
    MONGO_LOG_CONN = '[MONGO]> Connecting to MongoDB ...',
    MONGO_LOG_CONNECTED = '\x1B[32m[MONGO]> Connected to MongoDB',
}
