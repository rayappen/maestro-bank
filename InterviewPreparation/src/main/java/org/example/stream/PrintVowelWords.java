package org.example.stream;

import java.util.Arrays;
import java.util.List;

public class PrintVowelWords {

    public static void main(String[] args) {

        String str = "India is my country";

        Arrays.stream(str.split(" "))
                .filter(word -> !word.toLowerCase().chars()
                        .mapToObj(ch -> (char) ch)
                        .filter(ch -> List.of('a', 'e', 'i', 'o', 'u').contains(ch))
                        .toList().isEmpty())
                .forEach(System.out::println);

//        Arrays.stream(str.split(" "))
//                .filter(word -> word.toLowerCase().matches(".*[aeiou].*"))
//                .forEach(System.out::println);
    }

}
