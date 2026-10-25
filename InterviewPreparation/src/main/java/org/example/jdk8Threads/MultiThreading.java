package org.example.jdk8Threads;

import java.util.concurrent.TimeUnit;

public class MultiThreading {


    public static void main(String[] args) {

        try{
            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    System.out.println("we are in new thread: " + Thread.currentThread().getName());
                    System.out.println("Current thread priority: " + Thread.currentThread().getPriority());
                }
            });

            thread.setName("new worker thread");
            thread.setPriority(Thread.MAX_PRIORITY);

            //Creates a new thread and pass it to the OS
            System.out.println("We are in thread: " + Thread.currentThread().getName() + " before");
            thread.start();
            System.out.println("We are in thread: " + Thread.currentThread().getName() + " after");


            thread.setUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
                @Override
                public void uncaughtException(Thread t, Throwable e) {
                    System.out.println("A critical error showed up " + e.getLocalizedMessage());
                    e.printStackTrace();
                }
            });

            Thread.sleep(1000);
        }catch(InterruptedException e) {
            e.printStackTrace();
        }

    }

}
