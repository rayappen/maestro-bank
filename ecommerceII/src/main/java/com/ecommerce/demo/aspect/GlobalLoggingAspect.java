package com.ecommerce.demo.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class GlobalLoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalLoggingAspect.class);

    @Pointcut("""
            execution (* com.ecommerce.demo.controller.*.*(..)) ||
            execution (* com.ecommerce.demo.service.*.*(..)) ||
            execution (* com.ecommerce.demo.config.*.*(..) ||
            execution (* com.ecommerce.demo.util.*.*(..)
            """)
    public void applicationLayer(){};

    @Before("applicationLayer()")
    public void logMethodEntry(JoinPoint joinPoint) {
        String className = joinPoint.getSignature().getDeclaringType().getName();
        String methodName = joinPoint.getSignature().getName();
        LOGGER.info("AOP [ENTRY]: {}.{}() executed", className, methodName);
    }

    @After("applicationLayer()")
    public void logMethodAfter(JoinPoint joinPoint) {
        String className = joinPoint.getSignature().getDeclaringType().getName();
        String methodName = joinPoint.getSignature().getName();
        LOGGER.info("AOP [EXIT]: {}.{}() executed", className, methodName);
    }


}
