package org.example.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AverageSalaryDepartment {

    public static void main(String[] args) {
        List<EmployeeProblem.Employee> employees = new ArrayList<>();
        employees.add(new EmployeeProblem.Employee(1, "a", "hr", 45000));
        employees.add(new EmployeeProblem.Employee(1, "b", "it", 55000));
        employees.add(new EmployeeProblem.Employee(1, "c", "it", 65000));
        employees.add(new EmployeeProblem.Employee(1, "d", "hr", 35000));

        employees.stream()
                .collect(Collectors.groupingBy(EmployeeProblem.Employee::department,
                        Collectors.averagingDouble(EmployeeProblem.Employee::salary)))
                .entrySet()
                .forEach(System.out::println);
    }

}
