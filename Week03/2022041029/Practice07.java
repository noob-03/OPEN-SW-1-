import java.util.Scanner;
public class ArrayAccess{
	public static void main(String[] args) {
		Scanner scanner= new Scanner(System.in);
		
		int intArray[] = new int[5]; // 배열생성
		
		int max=0; // 현재가장큰수
		System.out.println("양수5개를입력하세요.");
		for(int i=0; i<5; i++) {
			intArray[i] = scanner.nextInt(); // 입력받은정수를배열에저장
			if(intArray[i] >max) // intArray[i]가현재가장큰수보다크면
				max = intArray[i]; // intArray[i]를max로변경
		}
		System.out.print("가장큰수는" + max + "입니다.");
		scanner.close();
	}
}
