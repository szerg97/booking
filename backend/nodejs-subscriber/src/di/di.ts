import { DependencyContainer } from 'tsyringe';
import { LogRepository } from '../repositories/LogRepository';
import { LogService } from '../services/LogService';
import { NameOf } from './nameof';

const registerDependencies = (
    container: DependencyContainer
): DependencyContainer => {
    container.register(NameOf.ILogService, {
        useClass: LogService,
    });

    container.register(NameOf.ILogRepository, {
        useClass: LogRepository,
    });

    return container;
};

export default registerDependencies;
