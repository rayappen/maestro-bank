package com.demo.ecommerce.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class ModernThreadService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ModernThreadService.class);

//    private final ExecutorService fixedThreadPool = Executors

//    public void sendAsyncNotification(String username) {
//        var task = new NotificationTask(username);
//
//        Thread vThread = Thread.ofVirtual()
//                .name("email-worker-", 1)
//                .unstarted(task);
//
//        vThread.start();
//
//        Thread.startVirtualThread(task);
//        try(ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()){
//            executor.submit(task);
//        }
//    }

}
