import java.util.*;
public class ArrayListEx {
    public static void main(String[] args) {
        // 문자열만삽입가능한ArrayList컬렉션생성
        ArrayList<String> a = new ArrayList<String>();
        // 위의코드대신var a = new ArrayList<String>(); 도가능
        // 키보드로부터4개의이름입력받아ArrayList에삽입
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < 4; i++) {
            System.out.print("이름을입력하세요>>");
            String s = scanner.next(); // 키보드로부터이름입력
            a.add(s); // ArrayList컬렉션에삽입
        }
        // ArrayList에들어있는모든이름출력
        for (int i = 0; i < a.size(); i++) {
            // ArrayList의i번째문자열얻어오기
            String name = a.get(i);
            System.out.print(name + " ");
        }
        //가장 긴 이름 출력
        int longestIndex = 0;
        for (int i = 1; i < a.size(); i++) {
            if(a.get(longestIndex).length() < a.get(i).length())
                    longestIndex = i;
        }
        System.out.println("\n가장 긴 이름은:"+ a.get(longestIndex));
        scanner.close();
    }

}
