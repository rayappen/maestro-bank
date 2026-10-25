package com.demo.ecommerce.service;

import org.springframework.stereotype.Service;

@Service
public class ProductService {

    public void processOrder(Long orderId) {
        // Business logic here...
        try { Thread.sleep(200); } catch (InterruptedException e) {}
    }

}
