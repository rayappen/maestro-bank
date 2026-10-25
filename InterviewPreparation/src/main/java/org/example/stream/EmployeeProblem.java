package org.example.stream;

import java.util.*;
import java.util.stream.Collectors;

public class EmployeeProblem {

    public record Employee(int id, String name, String department, int salary){};


    public static void main(String[] args) {

        List<Employee> list = new ArrayList<>();
        list.add(new Employee(1, "a", "hr", 45000));
        list.add(new Employee(1, "b", "it", 55000));
        list.add(new Employee(1, "c", "it", 65000));
        list.add(new Employee(1, "d", "hr", 35000));

        System.out.println(
        list.stream()
                .collect(Collectors.groupingBy(Employee::department))
                .entrySet()
                .stream()
                .map(entry -> entry.getValue()
                        .stream()
                        .distinct()
                        .sorted((e1, e2) -> Integer.compare(e2.salary(), e1.salary()))
                        .skip(1)
                        .findFirst()
                )
                .map(entry -> entry.get())
                .collect(Collectors.groupingBy(emp -> emp.department))

//                .forEach(entry -> System.out.println(entry.get().getClass()));
        );

        List<Employee> employees = new ArrayList<>();
        employees.add(new Employee(1, "a", "hr", 45000));
        employees.add(new Employee(1, "b", "it", 55000));
        employees.add(new Employee(1, "c", "it", 65000));
        employees.add(new Employee(1, "d", "hr", 35000));

        Map<String, Optional<Employee>> secondHighest = employees.stream()
                .collect(Collectors.groupingBy(
                        Employee::department,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                empList -> empList.stream()
                                        .sorted(Comparator.comparingDouble(Employee::salary).reversed())
                                        .map(Employee::salary)
                                        .distinct()
                                        .skip(1)
                                        .findFirst()
                                        .flatMap(sal -> empList.stream()
                                                .filter(e -> e.salary() == sal)
                                                .findFirst())
                        )
                ));

        System.out.println(secondHighest);
        secondHighest.forEach((dept, emp) ->
                System.out.println(dept + ": " + emp.map(e -> e.name() + " (" + e.salary() + ")").orElse("No 2nd highest"))
        );
    }
}
