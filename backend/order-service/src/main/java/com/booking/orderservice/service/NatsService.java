package com.booking.orderservice.service;

import io.nats.client.Connection;
import io.nats.client.Nats;
import io.nats.client.Options;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class NatsService {

    @Value("${nats.topic.name}")
    private String topic;
    @Value("${nats.url}")
    private String url;
    private Connection natsConnection;

    @PostConstruct
    public void sui() {
        try {
            natsConnection = initConnection();
        } catch (IOException e) {
            throw new IllegalStateException("Failed to connect to NATS");
        }
    }

    private Connection initConnection() throws IOException {
        Options options = new Options.Builder()
                .errorCb(ex -> log.error("Connection Exception: ", ex))
                .disconnectedCb(event -> log.error("Channel disconnected: {}", event.getConnection()))
                .reconnectedCb(event -> log.error("Reconnected to server: {}", event.getConnection()))
                .build();
        return Nats.connect(url, options);
    }

    public void publish(String msg) throws IOException {
        natsConnection.publish(topic, msg.getBytes());
    }

    public Connection getNatsConnection(){
        return this.natsConnection;
    }
}
