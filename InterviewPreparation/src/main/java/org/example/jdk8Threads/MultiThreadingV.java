package org.example.jdk8Threads;

import java.math.BigInteger;

public class MultiThreadingV {

    public static void main(String[] args) throws InterruptedException {

        Thread thread = new Thread(new LongComputionTask(new BigInteger("20000"), new BigInteger("10000")));
        thread.setDaemon(true);
        thread.start();
        Thread.sleep(100);
        thread.interrupt();
    }

    private static class LongComputionTask implements Runnable {

        private BigInteger base;
        private BigInteger power;

        LongComputionTask(BigInteger base, BigInteger power) {
            this.base = base;
            this.power = power;
        }

        @Override
        public void run(){
            System.out.println("base: " + base + " power: " + power + " = " + pow(base, power));
        }

        private BigInteger pow(BigInteger base, BigInteger power) {
            BigInteger result = BigInteger.ONE;

            for (BigInteger i = BigInteger.ZERO; i.compareTo(power) !=0; i = i.add(BigInteger.ONE)){

                //To shutdown the thread gracefully
//                if(Thread.currentThread().isInterrupted()) {
//                    System.out.println("Thread interrupted exiting");
//                    return BigInteger.ZERO;
//                }

                result = result.multiply(base);
            }

            return result;
        }

    }
}
