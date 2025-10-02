import java.util.Scanner;

// 환율 변환 기능을 제공하는 유틸리티 클래스
class CurrencyConverter {
    // static 필드: 모든 객체가 공유하는 하나의 변수. 여기서는 환율 정보를 저장.
    private static double rate; 

    // static 메소드: 원화를 달러로 변환
    public static double toDollar(double won) {
        return won / rate;
    }

    // static 메소드: 달러를 원화로 변환
    public static double toKWR(double dollar) {
        return dollar * rate;
    }

    // static 메소드: 공유 변수인 rate의 값을 설정
    public static void setRate(double r) {
        rate = r;
    }
}

// CurrencyConverter 클래스를 사용하는 메인 클래스
public class StaticMember {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("환율(1달러)>> ");
        double rate = scanner.nextDouble(); // 사용자로부터 환율 입력받음

        // 클래스 이름을 통해 static 메소드를 호출하여 공유 환율 정보를 설정
        CurrencyConverter.setRate(rate); 

        // 설정된 환율을 기반으로 변환 결과 출력
        System.out.println("백만원은 $" + CurrencyConverter.toDollar(1000000) + "입니다.");
        System.out.println("$100는 " + CurrencyConverter.toKWR(100) + "원입니다.");
        
        scanner.close();
    }
}

/* 출력값 예시:
환율(1달러)>> 1000    
백만원은 $1000.0입니다. 
$100는 100000.0원입니다.
*/
