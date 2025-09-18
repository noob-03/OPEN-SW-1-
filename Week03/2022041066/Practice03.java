// ‘a’ 부터‘z’ 까지출력하는프로그램을작성
public class DoWhileSample{
    public static void main (String[] args) {
        char c = 'a';
        
        do {
            System.out.print(c);
            c = (char) (c + 1);
        } while (c <= 'z');
    }
} 

//출력값: abcdefghijklmnopqrstuvwxyz
