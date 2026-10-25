package streams;


import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

record EmployeeRecord(String name, String department, int salary){}

public class CollectorMapping {

    public static void main(String[] args) {

        List<EmployeeRecord> list = Arrays.asList(
                new EmployeeRecord("arun", "IT", 50000),
                new EmployeeRecord("siva", "IT",70000),
                new EmployeeRecord("bala", "support",80000)
        );

        System.out.println(list.stream()
                .collect(Collectors.groupingBy(
                        EmployeeRecord::department,
                        Collectors.mapping(EmployeeRecord::name, Collectors.toSet())
                )));

        System.out.println(list.stream()
                .collect(Collectors.groupingBy(EmployeeRecord::department,
                        Collectors.maxBy((a, b) -> Integer.compare(a.salary(), b.salary())))));

    }

}
