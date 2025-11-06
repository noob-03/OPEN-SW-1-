package org.example.assignments;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor
public class HelloLombok {
    private String hello;
    private int lombok;

    public HelloLombok(String hello, int i) {
    }

    public static void main(String[] args) {
        HelloLombok lombok = new HelloLombok("hello", 5);

        System.out.println(lombok.getHello());
        System.out.println(lombok.getLombok());
    }
}

