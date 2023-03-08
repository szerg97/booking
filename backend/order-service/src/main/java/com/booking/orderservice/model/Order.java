package com.booking.orderservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@JsonIgnoreProperties(allowGetters = true)
public class Order {

    private Long id;
    @NotBlank
    private Long customerId;
    @NotBlank
    private Long apartmentId;
    @NotBlank
    private LocalDateTime dateOfArrival;
    @NotBlank
    private LocalDateTime dateOfDeparture;
    private String description;
    private final LocalDateTime timestamp = LocalDateTime.now();

    public Order() {
    }

    public Order(Long id, Long customerId, Long apartmentId, LocalDateTime dateOfArrival, LocalDateTime dateOfDeparture, String description) {
        this.id = id;
        this.customerId = customerId;
        this.apartmentId = apartmentId;
        this.dateOfArrival = dateOfArrival;
        this.dateOfDeparture = dateOfDeparture;
        this.description = description;
    }
}
