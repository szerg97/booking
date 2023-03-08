import { InsertOneResult } from 'mongodb';
import { inject, injectable } from 'tsyringe';
import { ILogRepository } from '../repositories/ILogRepository';
import { ILogService } from './ILogService';
import { Log } from '../log/log';
import { NameOf } from '../di/nameof';

@injectable()
export class LogService implements ILogService {
    public constructor(
        @inject(NameOf.ILogRepository) private _repository: ILogRepository
    ) {}
    public async insert(log: Log): Promise<InsertOneResult<Log>> {
        return await this._repository.insert(log);
    }
}
