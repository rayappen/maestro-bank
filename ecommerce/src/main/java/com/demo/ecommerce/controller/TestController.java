package com.demo.ecommerce.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/hello")
    public Map<String, String> sayHello(Authentication authentication) {
        return Map.of(
                "message", "Hello, " + authentication.getName() + "! Your JWT is valid.",
                "authorities", authentication.getAuthorities().toString()
        );
    }

}
