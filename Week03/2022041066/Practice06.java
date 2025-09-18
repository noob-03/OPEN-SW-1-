//“exit”가 입력되면 while 문을 벗어나도록 break문을 활용하는 프로그램
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
/* 출력 결과 예시
exit을입력하면종료합니다.
>>d
>>s
>>exit
종료합니다...
*/
