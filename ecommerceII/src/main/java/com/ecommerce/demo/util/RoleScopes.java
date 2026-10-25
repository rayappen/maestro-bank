package com.ecommerce.demo.util;

import java.util.Map;
import java.util.Set;

public class RoleScopes {
    private static final Map<String, Set<String>> MAP = Map.of(
            "ADMIN", Set.of("read:products", "write:products", "read:profile"),
            "CUSTOMER", Set.of("read:products", "read:profile")
    );

    public static Set<String> getScopesForRole(String roleName) {

        return switch (roleName.toUpperCase()) {
            case "ADMIN" -> Set.of("read:products", "write:products", "read:profile");
            case "CUSTOMER" -> Set.of("read:products", "read:profile");
            default -> Set.of("read:products");
        };

//        return MAP.getOrDefault(roleName.toUpperCase(), Set.of("read:products"));
    }
}
