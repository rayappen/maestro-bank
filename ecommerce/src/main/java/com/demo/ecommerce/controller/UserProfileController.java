package com.demo.ecommerce.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserProfileController {

    @GetMapping("/profile")
    public Map<String, String> getUserInforBasedOnToken(JwtAuthenticationToken authentication){

        String username = authentication.getName();
        String tokenIssuer = authentication.getToken().getClaimAsString("iss");
        String tokenExpiresAt = authentication.getToken().getExpiresAt().toString();
        String scopes = authentication.getToken().getClaim("scope");
        return Map.of(
                "username", username,
                "roles", authentication.getAuthorities().toString(),
                "tokenIssuedBy", tokenIssuer,
                "tokenExpiresAt", tokenExpiresAt,
                "rawScopeClaim", scopes
        );
    }

    @GetMapping("/id")
    public Map<String, String> getUsernameOnly(@AuthenticationPrincipal Jwt jwt) {
        // Access claims directly from the underlying Jwt model engine
        return Map.of(
                "subject_username", jwt.getSubject(),
                "custom_scope_value", jwt.getClaimAsString("scope")
        );
    }
}
