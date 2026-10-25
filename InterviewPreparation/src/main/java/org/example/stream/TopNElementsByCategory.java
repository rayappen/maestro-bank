package org.example.stream;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class TopNElementsByCategory {

    public record Product(String name, String category, double price){};


    public static void main(String[] args) {

        List<Product> products = Arrays.asList(
                new Product("Laptop", "Electronics", 1200.0),
                new Product("Phone", "Electronics", 800.0),
                new Product("Tablet", "Electronics", 500.0),
                new Product("Monitor", "Electronics", 300.0),
                new Product("Shirt", "Apparel", 40.0),
                new Product("Jacket", "Apparel", 120.0),
                new Product("Pants", "Apparel", 60.0),
                new Product("Shoes", "Apparel", 90.0)
        );

        products.stream()
                .collect(Collectors.groupingBy(
                        Product::category,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                prodList -> prodList.stream()
                                        .sorted(Comparator.comparingDouble(Product::price).reversed())
                                        .limit(3)
                                        .toList()
                        )))
                .entrySet()
                .forEach(System.out::println);
    }
}
