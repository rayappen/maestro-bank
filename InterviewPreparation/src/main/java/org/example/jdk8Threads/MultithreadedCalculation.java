package org.example.jdk8Threads;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class MultithreadedCalculation {

    public static void main(String[] args) throws InterruptedException {

        PowerCalculatingThread thread1 = new PowerCalculatingThread(2, 2);
        PowerCalculatingThread thread2 = new PowerCalculatingThread(3, 3);

        List<PowerCalculatingThread> threads = new ArrayList<>();
        threads.add(thread1);
        threads.add(thread2);

        for(int i = 0 ; i < threads.size(); i++) {
            threads.get(i).setName("worker-thread-no-"+i);
            threads.get(i).start();
        }

        for(PowerCalculatingThread thread : threads) {
            thread.join(1000);
        }

        long result = 0;
        for(PowerCalculatingThread thread : threads) {
            result += thread.getResult();
        }
        System.out.println("result = " + result);

    }

    private static class PowerCalculatingThread extends Thread {

        private long num;
        private long power;
        private long result;

        public PowerCalculatingThread(long num, long power) {
            System.out.println("Thread creation name: " + Thread.currentThread().getName() + " started: ");
            this.num = num;
            this.power = power;
        }

        @Override
        public void run() {
            System.out.println("Task initiated: " + Thread.currentThread().getName());
            this.result = calculatePower(this.num, this.power);
            System.out.println("Task completed: " + Thread.currentThread().getName());
        }

        public long calculatePower(long num, long power) {
            long result = 1;

            for (int i = 0; i < power; i++){
                result *= num;
            }

            return result;
        }

        public long getResult() {
            return result;
        }

        public void setResult(long result) {
            this.result = result;
        }
    }

}
