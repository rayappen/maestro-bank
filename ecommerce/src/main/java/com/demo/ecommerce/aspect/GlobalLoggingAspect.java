package com.demo.ecommerce.aspect;

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


    @Pointcut("execution(* com.demo.ecommerce.controller.*.*(..)) || " +
            "execution(* com.demo.ecommerce.service.*.*(..)) || " +
            "execution(* com.demo.ecommerce.config.*.*(..)) || " +
            "execution(* com.demo.ecommerce.util.*.*(..))")
    public void applicationLayers() {}

    @Before("applicationLayers()")
    public void logMethodEntry(JoinPoint joinPoint){
        String className = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        LOGGER.info("AOP [ENTRY]: {}.{}() executed", className, methodName);
    }

    @After("applicationLayers()")
    public void logMethodExit(JoinPoint joinPoint){
        String className = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        LOGGER.info("AOP [EXIT]: {}.{}() completed successfully", className, methodName);
    }
}
