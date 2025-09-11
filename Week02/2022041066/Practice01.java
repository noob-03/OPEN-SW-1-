//상수 PI를 선언하고 원의면적을 구하는 프로그램

public class CircleArea {
    public static void main(String[] args) {
        final double PI =3.14; //원주율을 상수로 선언

        double radius = 10.0; //원의 반지름 
        double CircleArea = radius*radius*PI; //원의 면적 계산

        System.out.println("원의 면적 =" + CircleArea);
    }
}

// 결과값: 원의 면적 =314.0 
