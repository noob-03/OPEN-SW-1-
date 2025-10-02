//너비와 높이를 입력받아 사각형의 합을 출력하는 프로그램을 작성하시오. 
import java.util.Scanner; // Scanner 클래스를 사용하기 위해 포함시킵니다.

public class Rectangle {
    // 필드 (멤버 변수) 선언
    int width;  // 사각형의 너비를 저장할 변수
    int height; // 사각형의 높이를 저장할 변수

    // 메소드 선언
    public int getArea() {
        // 너비와 높이를 곱하여 면적을 계산하고 반환합니다.
        return width * height;
    }

    public static void main(String[] args) {
        // Rectangle 클래스의 인스턴스(객체)를 생성합니다.
        Rectangle rect = new Rectangle();
        
        // 사용자로부터 키보드 입력을 받기 위해 Scanner 객체를 생성합니다.
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("너비와 높이를 순서대로 입력해주세요 >> ");
        
        // 사용자가 입력한 첫 번째 정수 값을 width 변수에 저장합니다.
        rect.width = scanner.nextInt();
        
        // 사용자가 입력한 두 번째 정수 값을 height 변수에 저장합니다.
        rect.height = scanner.nextInt();
        
        // getArea() 메소드를 호출하여 계산된 면적을 출력합니다.
        System.out.println("사각형의 면적은 " + rect.getArea() + "입니다.");
        
        // Scanner 사용이 끝났으므로 자원을 닫아줍니다.
        scanner.close();
    }
}

/*너비와 높이를 순서대로 입력해주세요 >> 10 1
사각형의 면적은 10입니다. */
