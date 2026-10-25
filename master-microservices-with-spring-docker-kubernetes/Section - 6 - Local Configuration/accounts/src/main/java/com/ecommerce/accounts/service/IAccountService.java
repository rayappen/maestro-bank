package com.ecommerce.accounts.service;

import com.ecommerce.accounts.dto.CustomerDto;

public interface IAccountService {

    /**
     * 
     * @param customerDto
     */
    void createAccount(CustomerDto customerDto);

    /**
     * 
     * @param mobileNumber
     * @return
     */
    CustomerDto fetchAccount(String mobileNumber);

    /**
     * 
     * @param customerDto
     */
    boolean updateAccount(CustomerDto customerDto);

    /**
     * 
     * @param mobileNumber
     * @return
     */
    boolean deleteAccount(String mobileNumber);
}
