import { InsertOneResult } from 'mongodb';
import { Log } from '../log/log';

export interface ILogRepository {
    insert(log: Log): Promise<InsertOneResult<Log>>;
}
