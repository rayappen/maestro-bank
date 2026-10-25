package streams;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class StringTransformation {

    public static void main(String[] args) {

    List<String> list = new ArrayList<>(List.of("banana", "apple", "orange"));

        System.out.println(list.stream()
            .map(String::toUpperCase)
//            .sorted()
            .sorted(Comparator.reverseOrder())
            .toList());

    }

}
