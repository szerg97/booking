import 'reflect-metadata';
import registerDependencies from './di/di';
import { container } from 'tsyringe';
import { MessageBusService } from './services/MessageBusService';
import {connectToDatabase} from "./services/mongo";

registerDependencies(container);
(async () => {
    await connectToDatabase();
    await MessageBusService.getInstance().run();
})();
