package org.example.stream;

import java.util.ArrayList;
import java.util.List;

public class RemoveDuplicates {

    public static void main(String[] args) {

        List<Character> list = new ArrayList<>();

        list.add('a');
        list.add('b');
        list.add('c');
        list.add('a');

        list.stream()
                .distinct()
                .toList()
                .forEach(System.out::println);
    }

}
