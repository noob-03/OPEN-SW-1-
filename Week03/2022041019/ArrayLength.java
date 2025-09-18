package AssignmentDay2;
import java.util.Scanner;

public class ArrayLength {

	public static void main(String[] args) {
		int intArray[] = new int[5]; // 배열의선언과생성
		int sum=0;
		
		Scanner scanner= new Scanner(System.in);
		System.out.print(intArray.length+ "개의정수를입력하세요>>");
		for(int i=0; i<intArray.length; i++)
			intArray[i] = scanner.nextInt(); // 키보드에서입력받은정수저장
		
		for(int i=0; i<intArray.length; i++)
			sum += intArray[i]; // 배열에저장된정수값을더하기
		
		System.out.print("평균은" + (double)sum/intArray.length);
		scanner.close();

	}

}
