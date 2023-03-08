package com.booking.orderservice.controller.health;

import com.booking.orderservice.service.NatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class NatsHealthIndicator implements HealthIndicator {

    private final NatsService natsService;

    @Autowired
    public NatsHealthIndicator(NatsService natsService) {
        this.natsService = natsService;
    }

    @Override
    public Health health() {
        Health.Builder status = Health.down();
        if (natsService.getNatsConnection().getState().toString().equals("CONNECTED")){
            status.up();
        }
        else{
            status.down();
        }
        return status.build();
    }
}
