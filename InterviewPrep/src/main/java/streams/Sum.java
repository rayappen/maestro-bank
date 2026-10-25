package streams;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Sum {

    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();

        for(int i = 0; i <= 10; i++)
            numbers.add(i);


        Optional<Integer> sum = numbers.stream()
                .reduce((result, element) -> result + element);

        sum.ifPresent(System.out::println);
    }

}
