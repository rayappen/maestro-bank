package com.demo.ecommerce.service;

import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class LegacyThreadService {

//    private static final Logger LOGGER = LoggerFactory.getLogger(LegacyThreadService.class);
//
//    private final ExecutorService fixedThreadPool = Executors.newFixedThreadPool(10);
//
//    public void sendAsyncNotification(String username) {
//        LOGGER.info("Entering sendAsyncNotification");
//        fixedThreadPool.submit(new NotificationTask(username));
//        LOGGER.info("Exiting sendAsyncNotification");
//    }
//
//    @PreDestroy
//    public void shutdown(){
//        LOGGER.info("Entering shutdown");
//        fixedThreadPool.shutdown();
//        LOGGER.info("Exiting shutdown");
//    }


}
