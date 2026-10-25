package org.example.jdk8Threads;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ConcurrencyDemo {

    private static void delay(int seconds) throws InterruptedException {
        Thread.sleep(seconds);
    }

    public static void main(String[] args) throws Exception {

        Runnable task = () -> {
            try{
                System.out.println("[" + Thread.currentThread().getName() + "] Task started...");
                delay(2);
                System.out.println("[" + Thread.currentThread().getName() + "] Task finished!");
            } catch (InterruptedException e) {
                e.printStackTrace();
                System.out.println("[" + Thread.currentThread().getName() + "] Task was INTERRUPTED!");
                Thread.currentThread().interrupt();
            }
        };

        // =====================================================================
        // 1. SYNCHRONOUS RUNNABLE (Blocking)
        // =====================================================================
        System.out.println("\n--- Starting Synchronous Runnable ---");
        task.run();
        System.out.println("[main] This line waits until the Runnable finishes.");

        // Setup an ExecutorService for the asynchronous examples
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // =====================================================================
        // 2. ASYNCHRONOUS RUNNABLE (Fire-and-Forget)
        // =====================================================================
        System.out.println("\n--- Starting Asynchronous Runnable ---");
        executor.submit(task);
        System.out.println("[main] Moving on immediately while the task runs in the background.");
        delay(3);

        // =====================================================================
        // 3. FUTURE (Asynchronous with Blocking Fetch)
        // =====================================================================
        System.out.println("\n--- Starting Future Demo ---");
        Future<?> future = executor.submit(task);
        System.out.println("[main] Doing other work while Future executes...");
        future.get();
        System.out.println("[main] Future.get() unblocked. Moving on.");

        // =====================================================================
        // 4. COMPLETABLEFUTURE (Asynchronous, Non-Blocking Pipelines)
        // =====================================================================
        System.out.println("\n--- Starting CompletableFuture Demo ---");

        CompletableFuture.runAsync(task, executor)
                .thenRun(() -> System.out.println("[" + Thread.currentThread().getName() + "] Callback: Task is done! No main thread blocking occurred."));

        System.out.println("[main] Main thread continues instantly without waiting for the callback.");
        delay(3); // Give it time to complete before demonstrating interruption

        // =====================================================================
        // 5. HANDLING INTERRUPTEDEXCEPTION
        // =====================================================================
        System.out.println("\n--- Simulating InterruptedException ---");

        Thread workerThread = new Thread(task, "WorkerThread");
        workerThread.start();

        delay(1);
        System.out.println("[main] Cancelling the worker thread prematurely...");
        workerThread.interrupt();

        executor.shutdown();
    }

}
