import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Scanner;

public class AlphabetHistogramApp{
    private int[] alphabetCount;
    public AlphabetHistogramApp() {
        alphabetCount= new int[26];
    }
    public void run() {// 키보드로부터알파벳문자를읽고히스토그램그리기를실행
        System.out.println("영문 텍스트를 입력하고 세미콜론을 입력하세요.");
        String text = readString();
        makeHistogram(text);
        drawHistogram();
    }
    private void makeHistogram(String text) { // 입력받은문자들로부터히스토그램의데이터를생성
        for(int i = 0 ; i < text.length() ; i++){
            char c = text.charAt(i);
            c = Character.toLowerCase(c);
            if(c >= 'a' && c <='z'){
                int index = c - 'a';
                alphabetCount[index]++;
            }
        }
    }
    private void drawHistogram() { // 히스토그램을그림
        System.out.println("히스토그램을 그립니다.");
        for(int i = 0 ; i < alphabetCount.length ; i++){
            char alphabet = (char)('A' + i);
            System.out.print(alphabet);
            for(int j = 0 ; j < alphabetCount[i] ; j++)
                System.out.print("-");
            System.out.println();
        }
    }
    private String readString() {
        StringBuffer sb = new StringBuffer(); // 키입력을받을스트링버퍼생성
        Scanner scanner= new Scanner(System.in);
        while(true) {
            String line = scanner.nextLine(); // 텍스트한라인을읽는다.
            if(line.equals(";")) // ; 만있는라인이면
                break; // 입력끝
            sb.append(line); // 읽은라인문자열을스트링버퍼에추가한다.
        }
        return sb.toString(); // 스트링버퍼의문자열을스트링으로리턴
    }
    public static void main(String[] args) { // main 메소드
            AlphabetHistogramApp game = new AlphabetHistogramApp();
            game.run();
    }
}
