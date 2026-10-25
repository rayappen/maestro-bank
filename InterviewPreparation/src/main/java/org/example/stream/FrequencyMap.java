package org.example.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class FrequencyMap {


    public static void main(String[] args) {

        List<Character> list = new ArrayList<>(List.of('a', 'b', 'c', 'a'));

        System.out.println(
        list.stream()
                .collect(Collectors.groupingBy(key -> key, Collectors.counting()))
                .entrySet()
                .stream()
                .filter(entry -> entry.getValue() > 1)
                .toList()
        );
    }

}
