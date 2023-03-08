export interface NatsMessage {
    timestamp: Date;
    payload: Payload;
}

export interface Payload {
    id: number;
    method: string;
    url: string;
    responseTimeInMilliseconds: number;
}
