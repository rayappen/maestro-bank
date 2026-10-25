package org.example.data.exchange;

import java.util.concurrent.atomic.AtomicInteger;

public class RaceCondition{

    private static final int ITERATION_COUNT = 10000000;

    public static void main(String[] args) throws InterruptedException {
        InventoryCounter counter = new InventoryCounter();
        IncrementingThread incrementingThread = new IncrementingThread(counter);
        incrementingThread.setName("worker-thread-increment");
        DecrementingThread decrementingThread = new DecrementingThread(counter);
        decrementingThread.setName("worker-thread-decrement");

        long start = System.currentTimeMillis();
        System.out.println("Start: " + start);
        incrementingThread.start();
        decrementingThread.start();

        incrementingThread.join();
        decrementingThread.join();
        long end = System.currentTimeMillis() - start;
        System.out.println("End: " + end);

        System.out.println("We currently have " + counter.getItems() + " items");
    }

    public static class IncrementingThread extends Thread {

        private InventoryCounter inventoryCounter;
        public IncrementingThread(InventoryCounter inventoryCounter) {
            this.inventoryCounter = inventoryCounter;
        }

        @Override
        public void run() {
            for(int i = 0; i < ITERATION_COUNT; i++) {
                inventoryCounter.increment();
            }
        }
    }

    public static class DecrementingThread extends Thread {

        private InventoryCounter inventoryCounter;
        public DecrementingThread(InventoryCounter inventoryCounter) {
            this.inventoryCounter = inventoryCounter;
        }

        @Override
        public void run() {
            for(int i = ITERATION_COUNT; i > 0; i--) {
                inventoryCounter.decrement();
            }
        }
    }

    private static class InventoryCounter {
        private int items = 0;
        private AtomicInteger atomicInteger = new AtomicInteger(0);
        final Object lock = new Object();

//        public synchronized void increment() {
////            System.out.println("Increment Current Thread: " + Thread.currentThread().getName());
//            items++;
//        }
//
//        public synchronized void decrement() {
////            System.out.println("Decrement Current Thread: " + Thread.currentThread().getName());
//            items--;
//        }
//
//        public synchronized int getItems() {
//             return this.items;
//        }

//        public void increment() {
//            synchronized (this.lock){
//                items++;
//            }
//        }
//
//        public void decrement() {
//            synchronized (this.lock){
//                items--;
//            }
//        }
//
//        public int getItems() {
//            synchronized (this.lock) {
//                return this.items;
//            }
//        }

        public void increment() {
            atomicInteger.incrementAndGet();
        }

        public void decrement() {
            atomicInteger.decrementAndGet();
        }

        public int getItems() {
            return this.atomicInteger.get();
        }
    }

}
