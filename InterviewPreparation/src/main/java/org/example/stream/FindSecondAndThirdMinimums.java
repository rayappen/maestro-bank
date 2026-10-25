package org.example.stream;

import java.util.ArrayList;
import java.util.List;

public class FindSecondAndThirdMinimums {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++){
            list.add(i);
        }


        list.stream()
                .distinct()
                .sorted(Integer::compareTo)
                .limit(3)
                .skip(1)
                .toList()
                .forEach(System.out::println);


    }

}
