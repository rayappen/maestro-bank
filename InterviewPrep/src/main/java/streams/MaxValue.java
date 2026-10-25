package streams;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class MaxValue {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++)
            list.add(i);

        System.out.println(list.stream()
                .max((a, b) -> a.compareTo(b))
                .orElse(0)
        );
    }

}
