import java.util.Scanner;

public class RockPaperScissors {
    public static void main(String[] args) {
  
        Scanner scanner = new Scanner(System.in, "UTF-8");

        System.out.println("가위바위보 게임 입니다. 가위, 바위, 보 중에서 입력하세요");

    
        System.out.print("철수 >> ");
        String cheolsu = scanner.next();

        
        System.out.print("영희 >> ");
        String yeonghui = scanner.next();

        // .equals() 메소드를 사용하여 문자열 내용을 비교
        // 먼저 비기는 경우를 확인
        if (cheolsu.equals(yeonghui)) {
            System.out.println("비겼습니다.");
        }
        // 철수가 이기는 모든 경우를 OR (||) 연산자로 묶어서 확인
        else if ((cheolsu.equals("가위") && yeonghui.equals("보")) ||
                 (cheolsu.equals("바위") && yeonghui.equals("가위")) ||
                 (cheolsu.equals("보") && yeonghui.equals("바위"))) {
            System.out.println("철수가 이겼습니다.");
        }
        // 비기지도 않고, 철수가 이기지도 않았다면 나머지는 영희가 이긴 경우
        else {
            System.out.println("영희가 이겼습니다.");
        }

       
        scanner.close();
    }
}
