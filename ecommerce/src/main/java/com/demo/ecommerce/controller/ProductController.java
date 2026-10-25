package com.demo.ecommerce.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("products")
public class ProductController {

    @GetMapping("/all")
    public Map<String, String> getAllProducts(){
        return Map.of("data", "Listing all public catalog ecommerce products...");
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('SCOPE_write:products')")
    public Map<String, String> createProduct(){
        return Map.of("message", "Product created successfully by an Administrator!");
    }

    @PostMapping("/view")
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN','SCOPE_ROLE_CUSTOMER')")
    public Map<String, String> viewProducts(){
        return Map.of("message", "you are viewing the whole product list");
    }
}
