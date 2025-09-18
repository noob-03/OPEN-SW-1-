import java.util.Random;
import java.util.Scanner;

public class Practice17 {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		Random random = new Random();
		int randomNumber = random.nextInt(100);
		System.out.println("수를 결정하였습니다. 맞추어 보세요");
		int count = 1;
		int low = 0;
		int high = 99;
		while(true) {
			System.out.println(low+"-"+high);
			System.out.print(count+">>");
			String text = scanner.next();
			if(text.equals("n")) {
				System.out.println("게임을 종료합니다.");
				scanner.close();
				return;
			}
			else {
				int userInput = Integer.parseInt(text);
				if(userInput == randomNumber) {
					System.out.println("맞았습니다.");
					System.out.print("다시하시겠습니까(y/n)>>");
					String answer = scanner.next();
					if(answer.equals("y")) {
						count = 1;
						low = 0;
						high = 99;
						randomNumber = random.nextInt(100);
						continue;
					}else
						scanner.close();
						break;
				}
				else if(userInput < randomNumber){
					System.out.println("더 높게");
					if(low < userInput)
						low = userInput;
					count++;
				}
				else if(userInput > randomNumber) {
					System.out.println("더 낮게");
					if(high > userInput)
						high = userInput;
					count++;
				}
			}
		}
	}
}
