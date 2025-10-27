package Assignments;

import java.io.InputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ByteArrayInputStream;
import java.util.Scanner;

public class AlphabetHistogramApp {
    int[] alphabetCount = new int[26];
    public AlphabetHistogramApp() {}
    public void run(){ // 키보드로부터알파벳문자를읽고히스토그램그리기를실행
        makeHistogram(readString());
        drawHistogram();
    }
    private void makeHistogram(String text) { // 입력받은문자들로부터히스토그램의데이터를생성
        InputStream inputStream = new ByteArrayInputStream(text.getBytes());
        InputStreamReader reader = new InputStreamReader(inputStream);
        try {
            char[] array = new char[256];
            int length = reader.read(array);

            for (int i = 0; i < length; i++) {
                char cur = array[i];
                if (cur >= 'a' && cur <= 'z') {
                    alphabetCount[cur - 'a']++;
                }
                if (cur >= 'A' && cur <= 'Z') {
                    alphabetCount[cur - 'A']++;
                }
            }
        }
        catch (IOException e) {System.out.println(e);}
        finally {
            try {reader.close();}
            catch (IOException e) {System.out.println(e);}
        }
    }
    private void drawHistogram(){ // 히스토그램을그림
        System.out.println("히스토그램을 그립니다.");
        int startAlpha = 65;
        for(int i = 0; i < 26; i++){
            char curAlphabet =  (char)(startAlpha +i);
            System.out.print(curAlphabet);
            for(int j=0; j<alphabetCount[i]; j++){
                System.out.print("-");
            }
            System.out.println(" ");
        }
    }
    private String readString() { // 키보드로부터문자열을읽어스트링버퍼에저장
        System.out.println("영문 텍스트를 입력하고 세미콜론을 입력하세요.");

        StringBuffer sb = new StringBuffer();
        Scanner scan = new Scanner(System.in);
        while(true) {
            String line = scan.nextLine();
            if(line.equals(";"))
                break;
            sb.append(line);
        }
        return sb.toString();
    }
    public static void main(String[] args) {
        AlphabetHistogramApp app = new AlphabetHistogramApp();
        app.run();
    }
}
