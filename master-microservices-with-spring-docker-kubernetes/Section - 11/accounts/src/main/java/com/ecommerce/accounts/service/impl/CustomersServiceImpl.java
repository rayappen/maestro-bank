package com.ecommerce.accounts.service.impl;

import com.ecommerce.accounts.dto.AccountsDto;
import com.ecommerce.accounts.dto.CardsDto;
import com.ecommerce.accounts.dto.CustomerDetailsDto;
import com.ecommerce.accounts.dto.LoansDto;
import com.ecommerce.accounts.entity.Accounts;
import com.ecommerce.accounts.entity.Customer;
import com.ecommerce.accounts.exception.ResourceNotFoundException;
import com.ecommerce.accounts.mapper.AccountsMapper;
import com.ecommerce.accounts.mapper.CustomerMapper;
import com.ecommerce.accounts.repository.AccountsRepository;
import com.ecommerce.accounts.repository.CustomerRepository;
import com.ecommerce.accounts.service.ICustomersService;
import com.ecommerce.accounts.service.client.CardsClient;
import com.ecommerce.accounts.service.client.LoansClient;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomersServiceImpl implements ICustomersService {

    private AccountsRepository accountsRepository;
    private CustomerRepository customerRepository;
    private CardsClient cardsClient;
    private LoansClient loansClient;
    
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomersServiceImpl.class);
    
    @Override
    public CustomerDetailsDto fetchCustomerDetails(String mobileNumber) {
        LOGGER.debug("Looking up customer by mobileNumber: {}", mobileNumber);
        Customer customer = customerRepository.findByMobileNumber(mobileNumber).orElseThrow(
                () -> new ResourceNotFoundException("Customer", "mobileNumber", mobileNumber)
        );
        Accounts accounts = accountsRepository.findByCustomerId(customer.getCustomerId()).orElseThrow(
                () -> new ResourceNotFoundException("Account", "customerId", customer.getCustomerId().toString())
        );

        CustomerDetailsDto customerDetailsDto = CustomerMapper.mapToCustomerDetailsDto(customer, new CustomerDetailsDto());
        customerDetailsDto.setAccountsDto(AccountsMapper.mapToAccountsDto(accounts, new AccountsDto()));

        LOGGER.debug("Calling loans service for mobileNumber: {}", mobileNumber);
        ResponseEntity<LoansDto> loansDtoResponseEntity = loansClient.fetchLoanDetails(mobileNumber);
        if(null != loansDtoResponseEntity){
            customerDetailsDto.setLoansDto(loansDtoResponseEntity.getBody());
        }else{
            LOGGER.warn("Loans service call failed or fell back for mobileNumber: {}", mobileNumber);
        }

        LOGGER.debug("Calling loans service for mobileNumber: {}", mobileNumber);
        ResponseEntity<CardsDto> cardsDtoResponseEntity = cardsClient.fetchCardDetails(mobileNumber);
        if(null != loansDtoResponseEntity){
            customerDetailsDto.setCardsDto(cardsDtoResponseEntity.getBody());
        }else{
            LOGGER.warn("Loans service call failed or fell back for mobileNumber: {}", mobileNumber);
        }

        return customerDetailsDto;
    }
}
