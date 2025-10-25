package Sample;

import java.util.*;
import java.io.*;

public class Practice9{

	static class Words {
	    private Vector<String> wordVector;

	    public Words(String fileName) {
	        wordVector = new Vector<String>();
	        try {
	            Scanner scanner = new Scanner(new FileReader(fileName));
	            while (scanner.hasNext()) {
	                String word = scanner.nextLine().trim();
	                if (!word.isEmpty()) wordVector.add(word);
	            }
	            scanner.close();
	        } catch (IOException e) {
	            System.out.println("단어 파일을 읽을 수 없습니다.");
	        }
	    }

	    public String getRandomWord() {
	        int index = (int) (Math.random() * wordVector.size());
	        return wordVector.get(index);
	    }
	}

	static public class HangManGameApp {
	    private Words words;
	    private String newWord;
	    private String hiddenWord;
	    private int failCount;

	    public HangManGameApp() {
	        words = new Words("words.txt");
	    }

	    public void run() {
	        System.out.println("행맨 게임을 시작합니다.");
	        Scanner scanner = new Scanner(System.in);
	        while (true) {
	            newWord = words.getRandomWord();
	            makeHidden();
	            failCount = 0;
	            while (true) {
	                System.out.println(hiddenWord);
	                System.out.print(">>");
	                char key = scanner.next().charAt(0);
	                if (!complete(key)) {
	                    failCount++;
	                    System.out.println("틀렸습니다. (" + failCount + "번 틀림)");
	                }
	                if (hiddenWord.equals(newWord)) {
	                    System.out.println(newWord + " 정답입니다!!");
	                    break;
	                }
	                if (failCount == 5) {
	                    System.out.println("5번 틀렸습니다. 정답은 " + newWord + " 입니다.");
	                    break;
	                }
	            }
	            System.out.print("Next(y/n)?");
	            String again = scanner.next();
	            if (again.equalsIgnoreCase("n")) break;
	        }
	        System.out.println("행맨 게임을 종료합니다.");
	        scanner.close();
	    }

	    private void makeHidden() {
	        StringBuilder sb = new StringBuilder(newWord);
	        int len = newWord.length();
	        Set<Integer> hiddenIndex = new HashSet<>();
	        while (hiddenIndex.size() < 2 && len > 2) {
	            int index = (int) (Math.random() * len);
	            hiddenIndex.add(index);
	        }
	        for (int i : hiddenIndex) sb.setCharAt(i, '-');
	        hiddenWord = sb.toString();
	    }

	    private boolean complete(char key) {
	        boolean found = false;
	        StringBuilder sb = new StringBuilder(hiddenWord);
	        for (int i = 0; i < newWord.length(); i++) {
	            if (newWord.charAt(i) == key && sb.charAt(i) == '-') {
	                sb.setCharAt(i, key);
	                found = true;
	            }
	        }
	        hiddenWord = sb.toString();
	        return found;
	    }

	    public static void main(String[] args) {
	        HangManGameApp game = new HangManGameApp();
	        game.run();
	    }
	}

}