/*
두정수를 입력받아 나눗셈을 하고 몫을 구하는 프로그램 코드이다. 
사용자가 나누는수에 0을입력하면 Arithmetic Exception예외가 발생하여 프로그램
*/
import java.util.Scanner;

public class DivideByZero{
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in);
        int dividend; // 나뉨수
        int divisor; // 나눗수

        System.out.print("나뉨수를입력하시오:");
        dividend = scanner.nextInt(); // 나뉨수입력
        System.out.print("나눗수를입력하시오:");
        divisor = scanner.nextInt(); // 나눗수입력
        System.out.println(dividend+"를"+ divisor + "로나누면몫은" + 
                           dividend/divisor + "입니다.");
        scanner.close();
    }
}

/* 실행 결과 예시
나뉨수를입력하시오:10
나눗수를입력하시오:2
10를2로나누면몫은5입니다.
or
나뉨수를입력하시오:10
나눗수를입력하시오:0
Exception in thread "main" java.lang.ArithmeticException: / by zero
at DivideByZero.main(DivideByZero.java:14)
 */
