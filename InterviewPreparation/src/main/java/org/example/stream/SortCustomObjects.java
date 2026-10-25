package org.example.stream;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class SortCustomObjects {

    public static void main(String[] args) {
        List<EmployeeProblem.Employee> list = new ArrayList<>();
        list.add(new EmployeeProblem.Employee(1, "b", "it", 55000));
        list.add(new EmployeeProblem.Employee(1, "c", "it", 65000));
        list.add(new EmployeeProblem.Employee(1, "d", "hr", 35000));
        list.add(new EmployeeProblem.Employee(1, "a", "hr", 35000));

        list.stream()
                .sorted(Comparator.comparing(EmployeeProblem.Employee::salary).thenComparing(EmployeeProblem.Employee::name))
                .toList()
                .forEach(System.out::println);

    }

}
