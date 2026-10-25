package org.example.stream;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class FirstNonRepeatedCharacter {

    public static void main(String[] args) {

        String str = "knsaojdnoasidnaosdnaoskdnao";

        System.out.println(
        str.chars()
                .mapToObj(ch -> (char) ch)
                .collect(Collectors.groupingBy((Function.identity()), LinkedHashMap::new,Collectors.counting()))
                .entrySet()
                .stream()
                .filter(ch -> ch.getValue() == 1)
                .findFirst()
    );

        System.out.println(
        str.chars()           // Stream of int representing characters
                .mapToObj(c -> (char) c) // Convert int to Character object
                .collect(Collectors.groupingBy(
                        Function.identity(),
                        LinkedHashMap::new, // Crucial: maintains insertion order
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .filter(entry -> entry.getValue() == 1) // Only keep non-repeated chars
                .map(Map.Entry::getKey)
                .findFirst() // Get the very first one matching the criteria
                .orElse(null) // Return null if all characters repeat
        );

    }

}
