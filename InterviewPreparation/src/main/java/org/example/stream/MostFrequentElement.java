package org.example.stream;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MostFrequentElement {

    public static void main(String[] args) {
        int[] numbers = {1, 3, 2, 1, 4, 1, 3, 3, 2};

        System.out.println(
        Arrays.stream(numbers)
                .boxed()
                .collect(Collectors.groupingBy(key -> key, Collectors.counting()))
                .entrySet()
                .stream()
                .filter(entry -> entry.getValue() == Arrays.stream(numbers)
                        .boxed()
                        .collect(Collectors.groupingBy(key -> key, Collectors.counting()))
                        .entrySet()
                        .stream()
                        .max((e1, e2) -> e1.getValue().compareTo(e2.getValue()))
                        .map(Map.Entry::getValue)
                        .orElseThrow()
                )
                .toList()
        );

        // Step 1: Compute the frequencies ONCE
        Map<Integer, Long> frequencies = Arrays.stream(numbers)
                .boxed()
                .collect(Collectors.groupingBy(key -> key, Collectors.counting()));

        // Step 2: Use the pre-computed map to filter the winners
        List<Map.Entry<Integer, Long>> result = frequencies.entrySet().stream()
                .filter(entry -> entry.getValue().equals(
                        frequencies.values().stream()
                                .max(Long::compareTo) // Correctly finds the maximum count
                                .orElseThrow()
                ))
                .toList();

    }

}
