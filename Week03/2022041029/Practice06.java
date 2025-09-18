import java.util.Scanner;
	public class BreakExample{
		public static void main(String[] args) {
			Scanner scanner= new Scanner(System.in);
			System.out.println("exit을입력하면종료합니다.");
			while(true) {
				System.out.print(">>");
				String text = scanner.nextLine();
				if(text.equals("exit")) // "exit"이입력되면반복종료
					break; // while 문을벗어남
		}
		System.out.println("종료합니다...");
		scanner.close();
	}
}
