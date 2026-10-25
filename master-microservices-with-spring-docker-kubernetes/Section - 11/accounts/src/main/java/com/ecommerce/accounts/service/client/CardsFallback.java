package com.ecommerce.accounts.service.client;

import com.ecommerce.accounts.dto.CardsDto;
import org.springframework.cloud.client.circuitbreaker.httpservice.HttpServiceFallback;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@HttpServiceFallback(value = CardsFallback.class, group = "cards")
public class CardsFallback {
    
    public ResponseEntity<CardsDto> fetchCardDetails(String mobileNumber){
        return null;
    }
}
