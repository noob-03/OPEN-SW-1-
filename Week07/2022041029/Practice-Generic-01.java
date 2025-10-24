import java.util.Vector;
public class VectorEx{
    public static void main(String[] args) { // 정수값만다루는제네릭벡터생성
        Vector<Integer> v = new Vector<Integer>();
        v.add(5); // 5 삽입
        v.add(4); // 4 삽입
        v.add(-1); // -1 삽입
        v.add(2, 100); // 4와-1 사이에정수100 삽입
        System.out.println("벡터내의요소객체수: " + v.size());
        System.out.println("벡터의현재용량: " + v.capacity());
        for(int i=0; i<v.size(); i++) { // 모든요소정수출력하기
            int n = v.get(i);
            System.out.println(n);
        }
        int sum = 0;
        for(int i=0; i<v.size(); i++) { // 벡터속의모든정수더하기
            int n = v.elementAt(i);
            sum += n;
        }
        System.out.println("벡터에있는정수합: " + sum);
    }
}
/*
출력결과
벡터내의요소객체수: 4
벡터의현재용량: 10
5
4
100
-1
벡터에있는정수합: 108
 */
