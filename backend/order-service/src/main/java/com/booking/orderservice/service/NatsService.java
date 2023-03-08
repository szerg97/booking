package com.booking.orderservice.service;

import io.nats.client.Connection;
import io.nats.client.Nats;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NatsService {

    @Value("${nats.topic.name}")
    private String topic;
    private Connection natsConnection;

    public void init() throws IOException {
        natsConnection = Nats.connect();
        Nats.ConnState state = natsConnection.getState();
        System.out.println(state.toString());
    }

    public void publish(String msg) throws IOException {
        natsConnection.publish(topic, msg.getBytes());
    }

    public Connection getNatsConnection(){
        return this.natsConnection;
    }
}
