package streams;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class GroupBy {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>(List.of("banana", "apple", "orange"));

        System.out.println(list.stream()
                .collect(Collectors.groupingBy(String::length)));

    }

}
