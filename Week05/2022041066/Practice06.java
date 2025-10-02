// 반지름이 0~4인 Circle 객체5개를 가지는 배열을 생성하고, 
// 배열에 있는 모든 Circle 객체의 면적을 출력하시오

// Circle 객체를 만들기 위한 설계도 (클래스)
class Circle {
    int radius; // 원의 반지름을 저장할 필드

    // 생성자: 객체가 생성될 때 반지름(radius) 값을 초기화
    public Circle(int radius) {
        this.radius = radius;
    }

    // 메소드: 원의 면적을 계산해서 반환
    public double getArea() {
        return 3.14 * radius * radius;
    }
}

// 메인 클래스 (프로그램 실행 시작점)
public class CircleArray {
    public static void main(String[] args) {
        // Circle 객체를 담을 수 있는 배열 c를 선언하고, 5개의 공간을 할당
        Circle[] c = new Circle[5];

        // for문을 사용하여 배열의 각 칸에 Circle 객체를 생성하여 넣음
        for (int i = 0; i < c.length; i++) {
            // c[0]에는 반지름 0인 원, c[1]에는 반지름 1인 원, ... 을 생성
            c[i] = new Circle(i);
        
        }

        // for문을 사용하여 배열에 있는 모든 Circle 객체의 면적을 출력
        for (int i = 0; i < c.length; i++) {
            // c[i].getArea()로 면적을 구하고, (int)를 통해 정수 부분만 가져와 출력
            System.out.print((int)(c[i].getArea()) + " ");
        }
    }
}

// 출력 값: 0 3 12 28 50
