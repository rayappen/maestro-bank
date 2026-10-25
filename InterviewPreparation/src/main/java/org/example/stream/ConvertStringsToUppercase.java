package org.example.stream;

import java.util.ArrayList;
import java.util.List;

public class ConvertStringsToUppercase {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>();

        list.add("abc");
        list.add("bca");
        list.add("cda");

        list.stream()
                .map(String::toUpperCase)
                .toList()
                .forEach(System.out::println);

    }

}
