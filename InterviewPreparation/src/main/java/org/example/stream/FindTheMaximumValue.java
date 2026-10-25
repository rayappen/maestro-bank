package org.example.stream;

import java.util.ArrayList;
import java.util.List;

public class FindTheMaximumValue {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++){
            list.add(i);
        }

        System.out.println(list.stream()
                .max(Integer::compareTo));
    }

}
