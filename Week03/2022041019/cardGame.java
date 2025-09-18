package AssignmentDay2;
import java.util.Scanner;
import java.util.Random;

public class cardGame {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);

		while(true) {
			Random rnd = new Random(); 
			int ranNum = rnd.nextInt(100);
			int index = 1;
			int flag = 0;
			System.out.println("수를 결정하였습니다. 맞추어 보세요");
			System.out.println("0-99");
			while(true) {
				System.out.print(index + ">>");
				index++;
				int nextNum = scanner.nextInt();
				if(nextNum<ranNum) {
					System.out.println("더 높게");
				}
				else if(nextNum>ranNum) {
					System.out.println("더 낮게");
				}
				if(nextNum == ranNum) {
					System.out.println("맞았습니다.");
					System.out.print("다시하겠습니까?(y/n)>>");
					char next = scanner.next().charAt(0);
					
					if(next=='y') {
						break;
					}
					else {
						flag = 1;
						break;
					}
				}
			}
			if(flag==1) break;
		}
	}

}
