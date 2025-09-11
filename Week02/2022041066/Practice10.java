// 다중 if-else 문을 이용하여 성적에 대해 학점을 부여하는 프로그램을 작성하라.


import java.util.Scanner;

public class Grading {
    public static void main(String[] args) {
        char grade;
        Scanner scanner= new Scanner(System.in);

        System.out.print("점수를입력하세요(0~100): ");
        int score = scanner.nextInt();     // 점수읽기
        if(score >= 90)              // score가90 이상 입력시 A
            grade = 'A';
        else if(score >= 80)   // score가80 이상90 미만 입력시 B
            grade = 'B';
        else if(score >= 70)   // score가70 이상80 미만 입력시 C
            grade = 'C';
        else if(score >= 60)   // score가60 이상70 미만 입력시 D
            grade = 'D';
        else                          // score가60 이만 입력시 F
            grade = 'F';
        System.out.println("학점은"+ grade + "입니다.");

        scanner.close();
}
}


