package org.example.jdk8Threads;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class KitchenSimulation {

    static class Chef implements Runnable {

        private final String chefName;
        private final String dish;

        public Chef(String chefName, String dish) {
            this.chefName = chefName;
            this.dish = dish;
        }

        @Override
        public void run() {
            System.out.println("🔥 [" + Thread.currentThread().getName() + "] " + chefName + " started cooking " + dish + ".");
            try{
                for(int progress = 25; progress <= 100; progress +=25){
                    TimeUnit.MICROSECONDS.sleep(500);
                    System.out.println("🍳 " + chefName + " is " + progress + "% done with " + dish + ".");
                }
            } catch (InterruptedException e) {
                System.out.println("❌ " + chefName + " was interrupted!");
                return;
            }
            System.out.println("✅ [" + Thread.currentThread().getName() + "] " + chefName + " finished cooking " + dish + "!");
        }
    }

    public static void legacyFlowI(){
        System.out.println("🏁 [" + Thread.currentThread().getName() + "] Restaurant kitchen is opening...\n");

        Chef chef1 = new Chef("Chef Marco", "Pasta Carbonara");
        Chef chef2 = new Chef("Chef Gordon", "Beef Wellington");

        Thread t1 = Thread.ofPlatform()
                .name("Thread-Marco")
                .unstarted(chef1);

        Thread t2 = Thread.ofPlatform()
                .name("Thread-Gordon")
                .unstarted(chef2);

        t1.start();
        t2.start();

        System.out.println("📢 [" + Thread.currentThread().getName() + "] Main thread gave orders. Waiting for chefs...\n");

        try{
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("\n🎉 [" + Thread.currentThread().getName() + "] All dishes are ready! Restaurant is open!");
    }

    private static String cookDish(String chefName, String dish) {

        System.out.println("🔥 [" + Thread.currentThread().getName() + "] " + chefName + " started cooking " + dish + ".");

        try{
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException(e);
        }

        System.out.println("🍳 [" + Thread.currentThread().getName() + "] " + chefName + " finished cooking!");
        return dish + " (Prepared beautifully by " + chefName + ")";
    }

    public static void legacyFlowII(){
        System.out.println("🏁 [" + Thread.currentThread().getName() + "] Modern Restaurant kitchen is opening...\n");

        ExecutorService kitchenStaffPool = Executors.newFixedThreadPool(2);

        try{
            CompletableFuture<String> order1 = CompletableFuture.supplyAsync(
                    () -> cookDish("Chef Marco", "Pasta Carbonara"), kitchenStaffPool
            );

            CompletableFuture<String> order2 = CompletableFuture.supplyAsync(
                    () -> cookDish("Chef Gordon", "Beef Wellington"), kitchenStaffPool
            );

            CompletableFuture<String> servingTray = order1.thenCombine(order2, (dish1, dish2) -> {
                System.out.println("\n🍽️  [" + Thread.currentThread().getName() + "] Plating the dishes together...");
                return "Serving Tray: [ " + dish1 + " AND " + dish2 + " ]";
            });

            System.out.println("📢 [" + Thread.currentThread().getName() + "] Main thread gave orders to the pool. Doing other management work...\n");

            String finalDelivery = servingTray.join();
            System.out.println("\n🎉 [" + Thread.currentThread().getName() + "] Delivery: " + finalDelivery);
        } finally {
            kitchenStaffPool.shutdown();
        }
    }

    public static void main(String[] args) {


    }

}
