package yoon_young_chan;

import java.util.Scanner;

public class Hello2025 {
    private int[] counts;

    public Hello2025() {
        counts = new int[26];
    }

    public void start() { // 실행 메서드
        System.out.println("영문 텍스트를 입력하고 세미콜론을 입력하세요.");
        String input = getInputText();
        countAlphabets(input);
        printHistogram();
    }

    // 입력받은 문자열에서 알파벳 빈도를 계산
    private void countAlphabets(String text) {
        for (int i = 0; i < text.length(); i++) {
            char ch = Character.toLowerCase(text.charAt(i));
            if (ch >= 'a' && ch <= 'z') {
                counts[ch - 'a']++;
            }
        }
    }

    // 히스토그램 출력
    private void printHistogram() {
        System.out.println("히스토그램을 그립니다.");
        for (int i = 0; i < counts.length; i++) {
            char letter = (char) ('A' + i);
            System.out.print(letter);
            for (int j = 0; j < counts[i]; j++) {
                System.out.print("-");
            }
            System.out.println();
        }
    }

    // 사용자로부터 여러 줄의 입력을 받고 세미콜론이 입력되면 종료
    private String getInputText() {
        StringBuilder sb = new StringBuilder();
        Scanner sc = new Scanner(System.in);

        while (true) {
            String line = sc.nextLine();
            if (line.equals(";"))
                break;
            sb.append(line);
        }

        return sb.toString();
    }

    public static void main(String[] args) {
    	Hello2025 app = new Hello2025();
        app.start();
    }
}

