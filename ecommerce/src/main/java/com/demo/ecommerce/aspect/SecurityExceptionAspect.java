package com.demo.ecommerce.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SecurityExceptionAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityExceptionAspect.class);

    @Around("execution(* com.demo.ecommerce.controller.AuthController.*(..))")
    public Object handleAuthException(ProceedingJoinPoint joinPoint) throws Throwable {
        try{
            // This line runs the login/register method and saves the response Map
            Object result = joinPoint.proceed();

            // You MUST return this result, otherwise your client gets an empty response!
            return result;
        } catch (AuthenticationException e) {
            LOGGER.error("AOP Alert: Authentication failed for method: {}", joinPoint.getSignature().getName(), e);
            throw new RuntimeException("Invalid username or password");
        }
    }

}
