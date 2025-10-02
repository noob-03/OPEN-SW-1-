/* 다음코드의 두 클래스 Sample과 AccessEx 클래스는 동일한패키지에
저장된다. 컴파일오류를 찾아내고 이유를 설명하시오.*/
class Sample {
    public int a;
    private int b;
    int c; // 디폴트 접근 지정

    // b 필드의 값을 설정하는 public 메소드 (Setter)
    public void setB(int value) {
        // 이 안에서 유효성 검사 등을 추가할 수 있습니다.
        this.b = value;
    }

    // b 필드의 값을 반환하는 public 메소드 (Getter)
    public int getB() {
        return b;
    }
}

public class AccessEx {
    public static void main(String[] args) {
        Sample aClass = new Sample();
        aClass.a = 10;         // OK (public)
        
        // aClass.b = 10;      // 에러! private 필드에 직접 접근 불가
        aClass.setB(10);       // OK! public 메소드를 통해 안전하게 접근
        
        aClass.c = 10;         // OK (default)

        System.out.println("a: " + aClass.a);
        System.out.println("b: " + aClass.getB()); // 값을 읽을 때도 getter 사용
        System.out.println("c: " + aClass.c);
    }
}
/*컴파일 오류
  aClass.b = 10; 라인에서 컴파일 오류가 발생한다.
  Sample 클래스의 b 필드가 private으로 선언되었기 때문이다. 
  해결 방법: Getter / Setter 메소드 사용 하기.
  AccessEx 클래스에서 setB() 메소드를 사용하면 문제를 해결할 수 있다.
  */

/* 출력값:
a: 10
b: 10
c: 10
*/
