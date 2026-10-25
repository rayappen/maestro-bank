package org.example.stream;

import java.util.ArrayList;
import java.util.List;

public class SquareAndFilter {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++){
            list.add(i);
        }


        list.stream()
                .map( el -> el * el)
                .filter(el -> el >= 10)
                .toList()
                .forEach(System.out::println);



    }

}
