package com.booking.orderservice.controller;

import com.booking.orderservice.controller.request.OrderRequest;
import com.booking.orderservice.controller.response.OrderResponse;
import com.booking.orderservice.service.NatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/order-service")
public class OrderController {

    private final NatsService natsService;

    @Autowired
    public OrderController(NatsService natsService) {
        this.natsService = natsService;
    }

    @RequestMapping("")
    public ResponseEntity<OrderResponse> add(@Valid @RequestBody OrderRequest request){
        try {
            natsService.publish(request.getOrder().toString());
            return ResponseEntity.ok().body(new OrderResponse(request.getOrder()));
        } catch (IOException e) {
            throw new IllegalStateException("Could not publish order...");
        }
    }
}
