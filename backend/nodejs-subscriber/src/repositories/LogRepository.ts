import {
    InsertOneResult,
} from 'mongodb';
import { injectable } from 'tsyringe';
import { ILogRepository } from './ILogRepository';
import { Log } from '../log/log';
import {collections} from "../services/mongo";

@injectable()
export class LogRepository implements ILogRepository {

    async insert(log: Log): Promise<InsertOneResult<Log>> {
        return await collections.logs!.insertOne(log);
    }
}
