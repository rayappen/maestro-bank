package streams;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

class Employee {

    String name;
    int salary;

    Employee(String name, int salary){
        this.name = name;
        this.salary = salary;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }

    public int getSalary(){
        return this.salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }
}

public class Partioning {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        for(int i = 0; i <= 10; i++)
            list.add(i);

        System.out.println(list.stream()
                .collect(Collectors.partitioningBy(num -> num % 2 == 0)));

        List<Employee> employees = Arrays.asList(
                new Employee("arun", 50000),
                new Employee("kumar", 45000),
                new Employee("jelsi", 90000)
        );

        System.out.println(employees.stream()
                .collect(Collectors.partitioningBy(emp -> emp.getSalary() > 80000, Collectors.mapping(Employee::getName, Collectors.toList()))));
    }

}
