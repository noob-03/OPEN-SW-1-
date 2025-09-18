// 5개의 정수를 입력받고 그중 양수들만 합하여 출력하는 프로그램
import java.util.Scanner;

public class ContinueExample{
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in);
        
        System.out.println("정수를5개입력하세요.");
        int sum=0;
        for(int i=0; i<5; i++) {
            int n = scanner.nextInt(); // 키보드에서정수입력
            if(n<=0)
                continue; // 양수가아닌경우다음반복으로진행
            else
                sum += n; // 양수인경우덧셈
        }
        System.out.println("양수의합은" + sum);
        
        scanner.close();
    }
}
/* 출력 결과 예시:
정수를5개입력하세요.
1 -2 3 4 -5
양수의합은8
 */
