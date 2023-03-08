export interface Log {
    timestamp: Date;
    payload: {
        id: number;
        method: string;
        url: string;
        responseTimeInMilliseconds: number;
    };
}
