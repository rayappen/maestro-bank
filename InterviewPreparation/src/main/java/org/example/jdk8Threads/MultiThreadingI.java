package org.example.jdk8Threads;

public class MultiThreadingI {

    public static void main(String[] args) {
        Thread thread = new NewThread();
        thread.setName("new-worker-thread-0");
        System.out.println("Current Thread: " + Thread.currentThread().getName());
        System.out.println("Before");
        thread.start();
        System.out.println("After");

//        Thread thread1 = new Thread(new Runnable() {
//            @Override
//            public void run() {
//                System.out.println("I'm going for a walk");
//            }
//        });
//
//        Thread thread2 = new Thread(new Runnable() {
//            @Override
//            public void run() {
//                System.out.println("I'm going to swim");
//            }
//        });
//
//        thread1.start();
//        thread2.start();
//        System.out.println("I'm going home");
    }

    private static class NewThread extends Thread {
        @Override
        public void run(){
            System.out.println("Thread started: " + Thread.currentThread().getName());
        }
    }

}
