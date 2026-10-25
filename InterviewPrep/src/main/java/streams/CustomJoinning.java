package streams;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CustomJoinning {

    public static void main(String[] args) {

        List<String> list = new ArrayList<>(List.of("Apple", "Banana", "Cherry"));

        System.out.println(list.stream()
                .collect(Collectors.joining(",","[", "]")));

    }

}
