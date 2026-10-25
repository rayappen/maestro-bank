package org.example.stream;

import java.util.stream.Collectors;

public class AnagramCheck {


    public static void main(String[] args) {

        System.out.println(isAnagram("car", "rac"));

    }

    public static boolean isAnagram(String str1, String str2) {
        String convStr1 = str1.toLowerCase()
                .chars()
                .sorted()
                .mapToObj(String::valueOf)
                .collect(Collectors.joining());

        String convStr2 = str2.toLowerCase()
                .chars()
                .sorted()
                .mapToObj(String::valueOf)
                .collect(Collectors.joining());


        return convStr2.equals(convStr1);
    }

}
