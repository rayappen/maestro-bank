package com.ecommerce.accounts.service.client;

import com.ecommerce.accounts.dto.CardsDto;
import com.ecommerce.accounts.dto.LoansDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange(value = "/ecommerce/api/v1/loan")
public interface LoansClient {
    
    @GetExchange(value = "/fetch", accept = "application/json")
    ResponseEntity<LoansDto> fetchLoanDetails(@RequestParam String mobileNumber);
}
