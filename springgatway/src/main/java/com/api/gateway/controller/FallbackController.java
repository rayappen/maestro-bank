package com.api.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class FallbackController {

    @GetMapping("/fallback/user")
    public Map<String, String> userServiceFallback() {
        return Map.of(
                "status", "Service Unavailable",
                "message", "The User Service is currently down or taking too long to respond. Please try again later."
        );
    }
}
