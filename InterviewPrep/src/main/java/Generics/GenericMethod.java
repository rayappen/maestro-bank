package Generics;

import java.util.*;

public class GenericMethod {

    static <T> void displayClassName(T element){
        System.out.println(element.getClass().getName() + '=' + element);
    }

    static <E> void printArray(E[] list) {
        for(E element : list){
            System.out.println(element);
        }
    }

    static <E> void printCollection(Collection<E> list){
        for(E element : list){
            System.out.println(element);
        }
    }

    public static void main(String[] args) {
        displayClassName("Joan");
        displayClassName(11);
        displayClassName(List.of("abc"));
        displayClassName(Arrays.asList("abc"));
        displayClassName(new ArrayList<>(List.of("abc")));

        List<String> test = Arrays.asList("abc");
        test.set(0, "Titanic");

        System.out.println(test);
//        test.removeFirst();

//        System.out.println(test);

        printArray(new String[]{"a", "b"});
        printCollection(List.of("Demo", "shit"));
        printCollection(Set.of("Demo", "shit"));
    }
}
