package streams;

import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class FrequencyMap {

    public static void main(String[] args) {

        String str = "jaosdinaosindoasnbdoasqnda";
        System.out.println(str.chars()
                .mapToObj(chars -> (char) chars)
                .collect(Collectors.groupingBy(c -> c, Collectors.counting())));

    }

}
