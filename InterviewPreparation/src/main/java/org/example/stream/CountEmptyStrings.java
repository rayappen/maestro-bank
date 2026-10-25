package org.example.stream;

import java.util.ArrayList;
import java.util.List;

public class CountEmptyStrings {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        list.add("abc");
        list.add("");
        list.add("cda");

        System.out.println(list.stream()
                .filter(String::isEmpty)
                .count());
    }

}
