package org.example.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class StringJoiner {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();

        list.add("abc");
        list.add("bca");
        list.add("cda");

        System.out.println(
        list.stream()
                .collect(Collectors.joining(",","[","]"))
        );
    }

}
