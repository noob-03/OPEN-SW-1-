package Sample;

import java.util.Scanner;
import java.util.Random;

public class Practice17{
	public static void main(String[] args) {
		Random random = new Random();
		
		Scanner scanner = new Scanner(System.in);
		
		while(true) {
			int number = random.nextInt(99);
			System.out.println("수를 결정하였습니다. 맞추어 보세요");
			int times = 1;
			int max = 99;
			int min = 0;
			
			while(true) {
				System.out.println(min +"-"+ max);
				System.out.print(times+">>");
				int pnum = scanner.nextInt();
				
				if(pnum < 0 || pnum >= 100) {
					System.out.println("범위를 벗어났습니다");
					continue;
				}
				
				else if(pnum > number) {
					System.out.println("더 낮게");
					max = pnum;
				}
				
				else if(pnum < number) {
					System.out.println("더 높게");
					min = pnum;
				}
				
				else if(pnum == number) {
					System.out.println("맞았습니다");
					break;
				}
				
			}
			
			System.out.print("다시 하시겠습니까?(y/n) >> ");
			String text=scanner.next();
			if(text.equals("n")) {
				break;
			}
			else if(text.equals("y")) {
				continue;
			}
			else {
				System.out.println("y/n이 아닌 다른 문자를 입력했습니다. 게임을 종료합니다.");
				break;
			}
			
		}
	}
}