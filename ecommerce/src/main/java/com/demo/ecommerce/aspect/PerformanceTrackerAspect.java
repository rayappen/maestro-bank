package com.demo.ecommerce.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class PerformanceTrackerAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(PerformanceTrackerAspect.class);

    @Pointcut("execution(* com.demo.ecommerce.service.ProductService.*(..))")
    public void productServiceMethods(){}

    @Around("productServiceMethods()")
    public Object profileMethodExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();

        LOGGER.info("AOP: Starting execution of {}", joinPoint.getSignature().toShortString());

        Object result = joinPoint.proceed();

        long endTime = System.currentTimeMillis();
        LOGGER.info("AOP: Finished execution in {} ms", (endTime - startTime));

        return result;
    }
}
