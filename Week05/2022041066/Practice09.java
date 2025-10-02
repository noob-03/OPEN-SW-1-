/* 가비지 컬렉션 강제 요청
  다음코드에서 언제 가비지가 발생하는지 설명하시오
 */

public class GarbageEx {
    public static void main(String[] args) {
        String a = new String("Good");   // 1. "Good" 객체 생성, a가 참조
        String b = new String("Bad");    // 2. "Bad" 객체 생성, b가 참조
        String c = new String("Normal"); // 3. "Normal" 객체 생성, c가 참조
        String d, e;                     // 4. 참조 변수 d, e 선언 (아직 가리키는 객체 없음)
        
        a = null;                        // 5. a가 "Good" 객체와의 연결을 끊음 -> "Good" 객체는 쓰레기(Garbage)가 됨
        d = c;                           // 6. d가 c와 동일한 "Normal" 객체를 가리킴
        c = null;                        // 7. c가 "Normal" 객체와의 연결을 끊음. 하지만 d가 여전히 참조 중
    }
}

/* 
a = null;이 실행되는 순간 가비지가 발생하며, 
화면에 아무것도 출력되지 않는다.
 */
