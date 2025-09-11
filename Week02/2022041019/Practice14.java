package AssignmentDay1;
import java.util.Scanner;

public class RockSiPaper {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.print("철수 >> ");
		String chelsu = scanner.next();
		
		System.out.print("영희 >> ");
		String younghi = scanner.next();
		
		if(chelsu.equals("가위")) {
			if(younghi.equals("보")) {
				System.out.print("철수가 이겼습니다");
			}
			else if(younghi.equals("가위")) {
				System.out.print("비겼습니다");
			}
			else {
				System.out.print("영희가 이겼습니다");
			}
		}
		
		if(chelsu.equals("보")) {
			if(younghi.equals("바위")) {
				System.out.print("철수가 이겼습니다");
			}
			else if(younghi.equals("보")) {
				System.out.print("비겼습니다");
			}
			else {
				System.out.print("영희가 이겼습니다");
			}
		}
		
		if(chelsu.equals("바위")) {
			if(younghi.equals("가위")) {
				System.out.print("철수가 이겼습니다");
			}
			else if(younghi.equals("바위")) {
				System.out.print("비겼습니다");
			}
			else {
				System.out.print("영희가 이겼습니다");
			}
		}
		scanner.close();
	}

}
