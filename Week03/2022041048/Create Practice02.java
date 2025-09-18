import java.util.Scanner;

public class Hello2025 {
	public static void main(String[] args) {
		int count=0; 
		int sum=0;
		Scanner scanner= new Scanner(System.in);
		System.out.println("정수를입력하고마지막에-1을입력하세요.");
		int n = scanner.nextInt(); 
		while(n != -1) { 
			sum += n;
			count++;
			n = scanner.nextInt(); 
		}
		if(count == 0) System.out.println("입력된수가없습니다.");
		else {
			System.out.print("정수의개수는" + count + "개이며");
			System.out.println("평균은" + (double)sum/count + "입니다.");
		}
		scanner.close();
	}
}
