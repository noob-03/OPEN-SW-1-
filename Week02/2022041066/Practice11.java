/*점수와 학년을 입력받아 60점 이상이면 합격, 미만이면 불합격을 출력한다.
단. 4학년의 경우에는 70점 이상이어야 합격이다
*/

import java.util.Scanner;

public class NestedIf{
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in);

        System.out.print("점수를입력하세요(0~100): ");
        int score = scanner.nextInt();
        System.out.print("학년을입력하세요(1~4): ");
        int year = scanner.nextInt();

        if(score >= 60) { // 60점이상
            if(year != 4)
                System.out.println("합격!"); // 4학년 아니면 합격
            else if(score >= 70)
                System.out.println("합격!"); // 4학년이 70점이상이면 합격
        else
            System.out.println("불합격!"); // 4학년이 70점미만이면 불합격
        }   
        else // 60점미만이면 불합격
            System.out.println("불합격!");
        scanner.close();
    }
}
