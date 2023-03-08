import {
    JSONCodec,
    NatsConnection,
} from 'nats';
import {container, inject, injectable} from 'tsyringe';
import {Constants} from '../helper/constants';
import {ILogService} from './ILogService';
import {NameOf} from '../di/nameof';
import {connectToNats} from '../nats/nats';
import * as dotenv from 'dotenv';
import {consumerConfig} from "../nats/config";
import {Log} from "../log/log";

/**
 * This class connects to the NATS server
 * and subscribes to topic 'hello'.
 * Right now this class is used
 * from the controller.
 * NOTE: Keycloak might not be working properly
 * when connected to a nats network
 */
@injectable()
export class MessageBusService {
    private _natsConnection: NatsConnection | undefined;
    private readonly _jc = JSONCodec();
    private static _instance: MessageBusService;
    private static _pullCounter = 0;

    public constructor(
        @inject(NameOf.ILogService) private _service: ILogService
    ) {
    }

    public static getInstance(): MessageBusService {
        if (!this._instance) {
            this._instance = container.resolve(MessageBusService);
        }
        return this._instance;
    }

    public async run() {
        await this.init();
    }

    public async init() {
        dotenv.config();
        this.printInfo();
        if (this._natsConnection) {
            console.log(Constants.NATS_LOG_INITED);
        } else {
            this._natsConnection = await connectToNats();
            if (this._natsConnection) {
                console.log(
                    `\x1B[32m[NATS]> Connected to ${this._natsConnection?.getServer()}`
                );
                await this.subscribe();
            }
        }
    }

    private async subscribe() {
        const psub = await this._natsConnection?.jetstream().pullSubscribe(process.env["SUBJECT"]!, {
            mack: true,
            config: consumerConfig,
        });

        const done = (async () => {
            for await (const m of psub!) {
                const log = this._jc.decode(m.data) as Log;
                await this._service.insert(log);
                console.log(
                    `[${m.seq}] ${
                        m.redelivered ? `${m.data}- redelivery ${m.info.redeliveryCount}` : `${m.data}`
                    }`,
                );
                m.ack();
            }
        })();

        const fn = () => {
            console.log(`\x1B[34m[NATS]> PULL ${+process.env["PULL_BATCH_SIZE"]!} messages from [${process.env["SUBJECT"]!}] (${++MessageBusService._pullCounter})`);
            psub!.pull({batch: +process.env["PULL_BATCH_SIZE"]!, expires: +process.env["PULL_EXPIRES"]!});
        };

        fn();

        setInterval(fn, +process.env["PULL_INTERVAL"]!);
        await done;
    }

    private printInfo(){
        console.log(`\x1B[33m[NATS]> PULL frequency: ${+process.env["PULL_INTERVAL"]!} ms`)
        console.log(`\x1B[33m[NATS]> PULL batch size: ${+process.env["PULL_BATCH_SIZE"]!}`)
        console.log(`\x1B[33m[NATS]> PULL expires: ${+process.env["PULL_EXPIRES"]!} ms`)
    }
}
