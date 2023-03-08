import {AckPolicy, ConsumerConfig, DeliverPolicy, nanos, ReplayPolicy} from "nats";

export const consumerConfig: Partial<ConsumerConfig> = {
    durable_name: "menu_consumer",
    ack_policy: AckPolicy.Explicit,
    ack_wait: nanos(4000),
};