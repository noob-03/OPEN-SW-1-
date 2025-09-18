import java.util.Scanner;
import java.util.Random;

public class Hello2025 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        System.out.println("숫자 맞추기 게임을 시작합니다! 0부터 99까지의 숫자를 맞춰보세요.");

        while (true) {
            int hiddenNumber = random.nextInt(100);
            int min = 0;
            int max = 99;
            int guessCount = 0;
            
            System.out.println("\n수를 결정했습니다. (" + min + "~" + max + ")");
            
            while (true) {
                guessCount++;
                System.out.print(guessCount + ">> ");
                
                int guess = scanner.nextInt();
                
                if (guess < min || guess > max) {
                    System.out.println("범위 내의 숫자를 입력해주세요. 현재 범위: " + min + "-" + max);
                    guessCount--; 
                    continue;
                }
                
                if (guess == hiddenNumber) {
                    System.out.println("정답입니다! " + guessCount + "번 만에 맞췄어요.");
                    break;
                } else if (guess < hiddenNumber) {
                    System.out.println("더 높게!");
                    min = guess;
                } else {
                    System.out.println("더 낮게!");
                    max = guess;
                }
                
                System.out.println("힌트: 현재 범위는 " + min + "-" + max + "입니다.");
            }
            
            System.out.print("\n게임을 다시 하시겠습니까? (y/n)>> ");
            String text = scanner.next();
            if (text.equalsIgnoreCase("n")) {
                System.out.println("게임을 종료합니다. 다음에 또 만나요!");
                break;
            } else if (!text.equalsIgnoreCase("y")) {
                System.out.println("잘못된 입력입니다. 게임을 다시 시작합니다.");
            }
        }
        
        scanner.close();
    }
}
