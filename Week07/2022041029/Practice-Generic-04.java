import java.util.*;
public class IteratorEx{
    public static void main(String[] args) {
        // 정수값만다루는제네릭벡터생성
        Vector<Integer> v = new Vector<Integer>();
        v.add(5); // 5 삽입
        v.add(4); // 4 삽입
        v.add(-1); // -1 삽입
        v.add(2, 100); // 4와-1 사이에정수100 삽입
        // Iterator를이용한모든정수출력하기
        Iterator<Integer> it = v.iterator();
        while(it.hasNext()) {
            int n = it.next();
            System.out.println(n);
        }
        // Iterator를이용하여모든정수더하기
        int sum = 0;
        it = v.iterator(); // Iterator 객체얻기
        while(it.hasNext()) {
            int n = it.next();
            sum += n;
        }
        System.out.println("벡터에있는정수합: " + sum);
    }
}
