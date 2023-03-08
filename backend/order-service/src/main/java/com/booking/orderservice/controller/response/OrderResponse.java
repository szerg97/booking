package com.booking.orderservice.controller.response;

import com.booking.orderservice.model.Order;
import lombok.Getter;

@Getter()
public class OrderResponse {

    private final String message;
    private final Order order;

    public OrderResponse(Order order)
    {
        this.message = "Order was sent for validation";
        this.order = order;
    }

    @Override
    public String toString() {
        return "OrderResponse{" +
                "order=" + order +
                ", message=" + message +
                '}';
    }
}
