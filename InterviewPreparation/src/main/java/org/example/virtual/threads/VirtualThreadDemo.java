package org.example.virtual.threads;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.LockSupport;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class VirtualThreadDemo {

    // Explicit Locks for thread-safe state alterations
    private final Lock explicitLock = new ReentrantLock();
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        VirtualThreadDemo demo = new VirtualThreadDemo();
        ResourceClass inventoryTracker = new ResourceClass();

        System.out.println("--- Starting Execution Pipeline ---\n");

        // 1. Demos: Basic Thread Creation Styles
        demo.createPlatformThread();
        demo.createPlatformThreadPerTask();
        demo.createPlatformThreadFixedPool();
        demo.createVirtualThread();
        demo.createVirtualThreadPerTask();

        // 2. Demos: Functional Interfaces & Futures
        demo.createCallableWithFuture();
        demo.createCallableWithCompletableFuture();

        // 3. Demo: Concurrency locks & Multithreading Parking
        System.out.println("\n--- Simulating High Concurrency Actions ---");
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 3; i++) {
                executor.submit(() -> demo.processOrderWorkflow(inventoryTracker));
            }
        } // Auto-closes and awaits completion here

        System.out.println("\nFinal Inventory Operations Tracked: " + inventoryTracker.getValue());
    }

    private void createPlatformThread() throws InterruptedException {
        Runnable runnable = () -> System.out.println("[Platform Thread] Single direct run: " + Thread.currentThread().getName());
        Thread platformThread = Thread.ofPlatform().name("Direct-Platform").unstarted(runnable);
        platformThread.start();
        platformThread.join();
    }

    private void createPlatformThreadPerTask() {
        Runnable runnable = () -> System.out.println("[Platform Pool] Task handled by: " + Thread.currentThread().getName());
        ThreadFactory factory = Thread.ofPlatform().name("platform-worker-", 1).factory();

        // Try-with-resources auto-closes the pool. executor.shutdown() is not needed!
        try (ExecutorService executor = Executors.newThreadPerTaskExecutor(factory)) {
            executor.submit(runnable);
        }
    }

    private void createPlatformThreadFixedPool() {
        Runnable runnable = () -> System.out.println("[Fixed Pool] Task handled by: " + Thread.currentThread().getName());
        try (ExecutorService executor = Executors.newFixedThreadPool(2)) {
            executor.submit(runnable);
        }
    }

    private void createVirtualThread() throws InterruptedException {
        Runnable runnable = () -> System.out.println("[Virtual Thread] Single direct run: " + Thread.currentThread());
        Thread virtualThread = Thread.ofVirtual().name("Direct-Virtual").unstarted(runnable);
        virtualThread.start();
        virtualThread.join();
    }

    private void createVirtualThreadPerTask() {
        Runnable runnable = () -> System.out.println("[Virtual Pool] Task handled by: " + Thread.currentThread());
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            executor.submit(runnable);
        }
    }

    private void createCallableWithFuture() {
        Callable<Integer> callable = () -> {
            Thread.sleep(50);
            return 2 + 2;
        };
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            Future<Integer> future = executor.submit(callable);
            // future.get() safely blocks until the evaluation completes
            System.out.println("[Future Result] Math evaluation output: " + future.get());
        } catch (Exception e) {
            System.err.println("Future execution failed: " + e.getMessage());
        }
    }

    private void createCallableWithCompletableFuture() {
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            // CRITICAL FIX: Pass the executor into supplyAsync so it uses Virtual Threads!
            CompletableFuture<Integer> pipeline = CompletableFuture.supplyAsync(() -> {
                return 100;
            }, executor).thenApplyAsync(result -> {
                return result * 2;
            }, executor);

            // result.join() blocks the current thread to extract the valid final integer value
            System.out.println("[CompletableFuture Result] Async Pipeline Output: " + pipeline.join());
        }
    }

    // AVOID 'synchronized' with Virtual Threads if doing I/O. Use ReentrantLocks instead to prevent carrier pinning.
    private void processOrderWorkflow(ResourceClass inventory) {
        // Read lock allowing concurrent visibility checks
        readLock.lock();
        try {
            System.out.printf("[%s] Checking Stock Availability Safely...%n", Thread.currentThread().getName());
            simulateNetworkDelayWithPark();
        } finally {
            readLock.unlock();
        }

        // Exclusive write lock for critical data state mutations
        writeLock.lock();
        try {
            System.out.printf("[%s] Modifying Stock Levels exclusively...%n", Thread.currentThread().getName());
            inventory.increment();
        } finally {
            writeLock.unlock();
        }
    }

    // MULTITHREADING PARK: Native low-overhead thread suspension execution
    private void simulateNetworkDelayWithPark() {
        System.out.printf(" -> [%s] Parking thread via LockSupport to simulate API retry backoff.%n", Thread.currentThread().getName());
        // Suspend the active thread execution context safely for 10 milliseconds
        LockSupport.parkNanos(TimeUnit.MILLISECONDS.toNanos(10));
    }

    // Thread-safe wrapper containing operational increments
    public static class ResourceClass {
        private final AtomicInteger atomicInteger = new AtomicInteger(0);

        public void increment() { atomicInteger.incrementAndGet(); }
        public void decrement() { atomicInteger.decrementAndGet(); }
        public int getValue() { return atomicInteger.get(); }
    }

}
