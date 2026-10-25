package org.example.jdk8Threads;

import java.time.Instant;

public class MultiThreadingIV {

    public static void main(String[] args) {

        Instant instant = Instant.now();
        Thread thread = new Thread(new BlockingThread());
        thread.start();
        thread.interrupt();
    }

    private static class BlockingThread implements Runnable {
        @Override
        public void run() {
            try{
                Thread.sleep(500000);
            } catch (InterruptedException e) {
                e.printStackTrace();
                Thread.currentThread().interrupt();
                System.out.println("Exiting blocking thread");
            }
        }
    }

}
