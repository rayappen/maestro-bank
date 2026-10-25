package com.ecommerce.demo.enums;

public enum RoleEnum {
    ADMIN("ADMIN"),
    SALES("SALES"),
    SALES_ASSIST("SALES_ASSIST"),
    CUSTOMER("CUSTOMER"),
    GUEST("GUEST");

    private final String value;

    RoleEnum(String value){
        this.value = value;
    }

    public String getValue(){
        return this.value;
    }
}
