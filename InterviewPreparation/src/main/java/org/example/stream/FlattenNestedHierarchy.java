package org.example.stream;

import java.util.Arrays;
import java.util.List;

public class FlattenNestedHierarchy {

    public static void main(String[] args) {

        List<List<Integer>> nestedLists = Arrays.asList(
                Arrays.asList(1, 2, 3),
                Arrays.asList(4, 5),
                Arrays.asList(6, 7, 8)
        );

        nestedLists.stream()
                .flatMap(List::stream)
                .toList()
                .forEach(System.out::println);
    }

}
