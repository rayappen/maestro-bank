package org.example.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PartitionElements {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++){
            list.add(i);
        }

        list.stream()
                .collect(Collectors.partitioningBy(num -> num % 2 == 0))
                .entrySet()
                .forEach(System.out::println);

    }

}
