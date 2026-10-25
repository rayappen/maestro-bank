package com.ecommerce.accounts.service.client;

import com.ecommerce.accounts.dto.CardsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange(value = "/ecommerce/api/v1/cards")
public interface CardsClient {
    
    @GetExchange(value = "/fetch", accept = "application/json")
    ResponseEntity<CardsDto> fetchCardDetails(@RequestParam String mobileNumber);
}
