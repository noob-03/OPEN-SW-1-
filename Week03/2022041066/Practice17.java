/* 카드의수를 맞추는 게임. 0에서 99까지의 임의의수를 가진카드를 한장 숨기고 
이카드의수를 맞추는 게임. 사용자는 “더높게”, “더낮게“를 입력하며 수를 맞춘다 */
import java.util.Scanner;
import java.util.Random;

public class GuessNumberGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        while(true) {
            // 0부터 99까지의 임의의 수 생성
            int hiddenNumber = random.nextInt(100);
            int min = 0;
            int max = 99;
            int guessCount = 0;
            
            System.out.println("수를 결정하였습니다. 맞추어 보세요");
            System.out.println(min + "-" + max);
            
            while(true) {
                guessCount++;
                System.out.print(guessCount + ">>");
                int guess = scanner.nextInt();
                
                if(guess == hiddenNumber) {
                    System.out.println("맞았습니다.");
                    break;
                } else if(guess < hiddenNumber) {
                    System.out.println("더 높게");
                    min = guess + 1;
                } else {
                    System.out.println("더 낮게");
                    max = guess - 1;
                }
                System.out.println(min + "-" + max);
            }
            
            // 다시 하시겠습니까?
            System.out.print("다시하시겠습니까(y/n)>>");
            String text = scanner.next();
            if(text.equals("n")) {
                break;
            }
        }
        
        scanner.close();
    }
}

/* 실행 결과 예시
수를 결정하였습니다. 맞추어 보세요
0-99
1>>50
더 낮게
0-49
2>>30
더 낮게
0-29
3>>10
더 높게
11-29
4>>20
더 낮게
11-19
5>>15
더 높게
16-19
6>>18
맞았습니다.
다시하시겠습니까(y/n)>>
*/

