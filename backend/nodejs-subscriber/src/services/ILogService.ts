import { InsertOneResult } from 'mongodb';
import { Log } from '../log/log';

export interface ILogService {
    insert(log: Log): Promise<InsertOneResult<Log>>;
}
