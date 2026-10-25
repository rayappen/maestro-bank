package streams;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class SecondLargest {

    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++)
            list.add(i);


        System.out.println(list.stream()
                .sorted(Comparator.reverseOrder())
                .distinct()
                .skip(1)
                .findFirst());

        int first = list.getFirst();
        int second = Integer.MIN_VALUE;

        for(int num : list) {
            if (num > first){
                second = first;
                first = num;
            }
            else if(num != first && num > second) {
                second = first;
            }
        }

        System.out.println("first: " + first);
        System.out.println("second: " + second);
    }

}
