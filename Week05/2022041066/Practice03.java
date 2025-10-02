//  다음코드는 2개의 생성자를 가진 Circle 클래스이다. 실행결과는무엇인가?
public class Circle_1 {
    // 필드 (멤버 변수) 선언
    int radius;  // 원의 반지름을 저장할 변수
    String name; // 원의 이름을 저장할 변수

    // 생성자 1: 매개변수 없는 기본 생성자
    public Circle_1() {
        radius = 1;      // radius 필드를 1로 초기화
        name = "";       // name 필드를 빈 문자열로 초기화
    }

    // 생성자 2: 매개변수를 가진 생성자
    public Circle_1(int r, String n) {
        radius = r;      // 매개변수 r로 radius 필드를 초기화
        name = n;        // 매개변수 n으로 name 필드를 초기화
    }

    // 메소드 선언
    public double getArea() {
        // 원의 면적을 계산하여 반환 (π * r^2)
        return 3.14 * radius * radius;
    }

    // 프로그램의 시작점, main 메소드
    public static void main(String[] args) {
        // 1. 매개변수를 가진 생성자를 사용하여 Circle_1 객체 생성
        Circle_1 pizza = new Circle_1(10, "자바피자"); 

        // pizza 객체의 면적을 계산
        double area = pizza.getArea();
        System.out.println(pizza.name + "의 면적은 " + area); // 결과 출력

        // 2. 기본 생성자를 사용하여 Circle_1 객체 생성
        Circle_1 donut = new Circle_1(); // radius는 1, name은 ""으로 자동 초기화됨
        
        // donut 객체의 이름을 변경
        donut.name = "도넛피자"; 

        // donut 객체의 면적을 계산
        area = donut.getArea();
        System.out.println(donut.name + "의 면적은 " + area); // 결과 출력
    }
}

/*
출력값:
자바피자의 면적은 314.0
도넛피자의 면적은 3.14
 */
