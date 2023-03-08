package com.booking.orderservice.controller.request;

import com.booking.orderservice.model.Order;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class OrderRequest {

    private final Order order;

    public OrderRequest(@JsonProperty("order") Order order)
    {
        this.order = order;
    }

    @Override
    public String toString() {
        return "OrderRequest{" +
                "order=" + order +
                '}';
    }
}
