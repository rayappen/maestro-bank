package org.example.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CharacterFrequencyCount {

    public static void main(String[] args) {

        List<Character> list = new ArrayList<>(List.of('a', 'b', 'c', 'a'));

        list.stream()
                .collect(Collectors.groupingBy((key -> key), Collectors.counting()))
                .entrySet()
                .forEach(System.out::println);
    }

}
