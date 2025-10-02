/* static 활용
 전역함수로 작성하고자 하는 abs, max, min의 3개 함수를 static 메소드로
 작성하고 호출하는 사례를 보이시오
 */
class Calc {
    // static 메소드들은 객체 생성 없이 '클래스이름.메소드이름()' 형태로 바로 사용할 수 있습니다.

    // 절대값을 구하는 메소드
    public static int abs(int a) {
        return a > 0 ? a : -a; // a가 양수이면 a를, 아니면 -a를 반환
    }

    // 두 수 중 큰 값을 구하는 메소드
    public static int max(int a, int b) {
        return (a > b) ? a : b; // a가 b보다 크면 a를, 아니면 b를 반환
    }

    // 두 수 중 작은 값을 구하는 메소드
    public static int min(int a, int b) {
        return (a > b) ? b : a; // a가 b보다 크면 b를, 아니면 a를 반환
    }
}

// Calc 클래스의 메소드를 사용하는 메인 클래스
public class CalcEx {
    public static void main(String[] args) {
        // Calc 클래스의 객체를 생성하지 않고, 클래스 이름으로 static 메소드를 직접 호출
        System.out.println(Calc.abs(-5));   // -5의 절대값인 5를 출력
        System.out.println(Calc.max(10, 8));  // 10과 8 중 큰 값인 10을 출력
        System.out.println(Calc.min(-3, -8)); // -3과 -8 중 작은 값인 -8을 출력
    }
}

/* 출력값:
5
10
-8
 */
