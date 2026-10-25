package com.ecommerce.demo.controller;

import com.ecommerce.demo.enums.RoleEnum;
import com.ecommerce.demo.service.UserService;
import com.ecommerce.demo.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "auth")
public class AuthController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
    
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            UserService userService){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    public record LoginRequest(String username, String password, RoleEnum role){};

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request){
        LOGGER.info("Login Request: {}", request);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        
        String token = jwtUtil.generateJwtToken(authentication);
        return Map.of("token", token);
    }
    
    @RequestMapping(value = "register", method = RequestMethod.POST)
    public Map<String, String> register(@RequestBody LoginRequest loginRequest) {
        userService.registerUser(loginRequest);
        return Map.of("message","User registered successfully with a secure BCrypt hash!");
    }
}
