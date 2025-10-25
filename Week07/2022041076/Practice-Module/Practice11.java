package Sample;

import java.util.Scanner;

public class Practice11{
	
	static class AlphabetHistogramApp {
	    private int[] count;

	    public AlphabetHistogramApp() {
	        count = new int[26];
	    }

	    public void run() {
	        String text = readString();
	        makeHistogram(text);
	        drawHistogram();
	    }

	    private void makeHistogram(String text) {
	        for (int i = 0; i < text.length(); i++) {
	            char ch = text.charAt(i);
	            if (Character.isLetter(ch)) {
	                ch = Character.toUpperCase(ch);
	                count[ch - 'A']++;
	            }
	        }
	    }

	    private void drawHistogram() {
	        System.out.println("히스토그램을 그립니다.");
	        for (int i = 0; i < count.length; i++) {
	            System.out.print((char) ('A' + i) + ":");
	            for (int j = 0; j < count[i]; j++) {
	                System.out.print("-");
	            }
	            System.out.println();
	        }
	    }

	    private String readString() {
	        StringBuffer sb = new StringBuffer();
	        Scanner scanner = new Scanner(System.in);
	        System.out.println("영문 텍스트를 입력하고 세미콜론(;)을 입력하세요.");
	        while (true) {
	            String line = scanner.nextLine();

	        }
	    }
	}
}