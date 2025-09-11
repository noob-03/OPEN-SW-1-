// 입력받은 성적에 대해 학점을 부여하는 프로그램

import java.util.Scanner;

public class GradingSwitch{
    public static void main (String[] args) {
        Scanner scanner= new Scanner(System.in);
        char grade;
        System.out.print("점수를입력하세요(0~100): ");
        int score = scanner.nextInt();
        switch (score/10) {
            case 10: // score = 100 이면 switch 문의 'fall-through' 동작 방식 에 의해 
                     // case 9;로 넘어가고 grade 변수에 'A'가 할당되고 작동이 끝난다.
            case 9:  // score =90~99 이면 A
                grade = 'A';
                break;
            case 8:  // score =80~89 이면 B
                grade = 'B';
                break;
            case 7:  // score =70~79 이면 C
                grade = 'C';
                break;
            case 6:  // score =60~69 이면 D
                grade = 'D';
                break;
            default: // score =59 이하 이면 F
                grade = 'F';
        }
        System.out.println("학점은"+grade+"입니다");
        scanner.close();
    }
}
