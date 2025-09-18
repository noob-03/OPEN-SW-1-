package AssignmentDay2;
import java.util.Scanner;

public class DevideByZeroHandling {

	public static void main(String[] args) {
		Scanner scanner= new Scanner(System.in);
		while(true) {
			System.out.print("나뉨수를입력하시오:");
			int dividend = scanner.nextInt(); // 나뉨수입력
			System.out.print("나눗수를입력하시오:");
			int divisor = scanner.nextInt(); // 나눗수입력
			try {
				System.out.println(dividend + "를"+ divisor + "로나누면몫은"+ dividend/divisor + "입니다");
				break; // 정상적인나누기완료후while 벗어나기
			}
			catch(ArithmeticException e) { // ArithmeticException예외처리코드
				System.out.println("0으로나눌수 없습니다. 다시입력하세요");
			}
		}
		scanner.close();

	}

}
