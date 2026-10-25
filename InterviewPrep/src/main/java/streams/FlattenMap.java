package streams;

import java.util.ArrayList;
import java.util.List;

public class FlattenMap {

    public static void main(String[] args) {

        List<List<String>> list = new ArrayList<>(List.of(List.of("Antony", "Rayappen", "Joe", "Joanna"), List.of("Bastina", "Rosary", "Joanna")));

        System.out.println(list.stream()
                .flatMap(List::stream)
                .distinct()
                .sorted()
                .toList());

//        System.out.println(list);

    }

}
