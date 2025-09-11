package Sample;

import java.util.Scanner;

public class Practice14{
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.print("철수 >> ");
		String Soo = scanner.next();
		
		System.out.print("영희 >> ");
		String Young = scanner.next();
		
		switch(Soo) {
		case "가위":
			switch(Young) {
			case "가위":
				System.out.println("비겼습니다.");
				break;
			case "바위":
				System.out.println("영희가 이겼습니다");
				break;
			case "보":
				System.out.println("철수가 이겼습니다.");
				break;
			}
			break;
		case "바위":
			switch(Young) {
			case "바위":
				System.out.println("비겼습니다.");
				break;
			case "보":
				System.out.println("영희가 이겼습니다");
				break;
			case "가위":
				System.out.println("철수가 이겼습니다.");
				break;
			}
			break;
		case "보":
			switch(Young) {
			case "보":
				System.out.println("비겼습니다.");
				break;
			case "가위":
				System.out.println("영희가 이겼습니다");
				break;
			case "바위":
				System.out.println("철수가 이겼습니다.");
				break;
			}
			break;
		}
		scanner.close();
	}
}