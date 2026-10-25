package streams;

import java.util.ArrayList;
import java.util.List;

public class EvenNumbers {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++)
            list.add(i);

        System.out.println(list.stream()
                .filter(num -> num % 2 == 0)
                .toList()
        );
    }

}
