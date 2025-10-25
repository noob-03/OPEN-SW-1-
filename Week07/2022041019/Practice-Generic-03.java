package org.example;

import java.util.*;

public class Practice03 {
    public static void main(String[] args) {
        ArrayList<String> a = new ArrayList<String>();
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < 4; i++) {
            System.out.print("이름을입력하세요>>");
            String s = scanner.next();
            a.add(s);
        }
        for (int i = 0; i < a.size(); i++) {
            String name = a.get(i);
            System.out.print(name + " ");
        }
        int longestIndex= 0;
        for(int i=1; i<a.size(); i++) {
            if(a.get(longestIndex).length() < a.get(i).length())
                longestIndex= i;
        }
        System.out.println("\n가장긴 이름은: " +
                a.get(longestIndex));
        scanner.close();
    }

}
