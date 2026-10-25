package org.example.stream;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class SecondLargest {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++){
            list.add(i);
        }

        System.out.println(list.stream()
                .sorted(Comparator.reverseOrder())
                .distinct()
                .skip(1)
                .findFirst()
                .orElseThrow()
        );
    }

}
