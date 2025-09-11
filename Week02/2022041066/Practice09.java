// 입력된수가 3의배수인지 판별하는 프로그램을 작성하라.

import java.util.Scanner;

public class MultipleOfThree{
    public static void main (String[] args) {
        Scanner in = new Scanner(System.in);

        System.out.print("수를입력하시오: ");
        int number = in.nextInt();

        if (number % 3 == 0)
            System.out.println("3의 배수 입니다.");
        else
            System.out.println("3의 배수가 아닙니다.");

        in.close();
    }
}
/*
60 같은 3의 배수 입력시 -> 3의 배수 입니다.
59 같은 3의 배수가 아닌걸 입력시 -> 3의 배수가 아닙니다.
*/
