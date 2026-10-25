package com.ecommerce.accounts.service.client;

import com.ecommerce.accounts.dto.LoansDto;
import org.springframework.cloud.client.circuitbreaker.httpservice.HttpServiceFallback;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@HttpServiceFallback(value = LoansFallback.class, group = "loans")
public class LoansFallback {
    
    public ResponseEntity<LoansDto> fetchLoanDetails(String mobileNumber){
        return null;
    }
    
}
