package Sample;

import java.util.Scanner;
import java.util.StringTokenizer;
import java.util.InputMismatchException;
import java.util.Scanner;
import java.util.Vector;

public class Practice9{

	static class Word {
	    private String english;
	    private String korean;

	    public Word(String english, String korean) {
	        this.english = english;
	        this.korean = korean;
	    }

	    public String getEnglish() {
	        return english;
	    }

	    public String getKorean() {
	        return korean;
	    }
	}

	static public class WordQuiz {
	    private Vector<Word> v;
	    private String quizName;

	    public WordQuiz(String name) {
	        quizName = name;
	        v = new Vector<Word>();
	        v.add(new Word("love", "사랑"));
	        v.add(new Word("animal", "동물"));
	        v.add(new Word("emotion", "감정"));
	        v.add(new Word("human", "인간"));
	        v.add(new Word("stock", "주식"));
	        v.add(new Word("trade", "거래"));
	        v.add(new Word("society", "사회"));
	        v.add(new Word("baby", "아기"));
	        v.add(new Word("honey", "꿀"));
	        v.add(new Word("doll", "인형"));
	        v.add(new Word("bear", "곰"));
	        v.add(new Word("picture", "그림"));
	        v.add(new Word("painting", "회화"));
	        v.add(new Word("fault", "오류"));
	        v.add(new Word("example", "보기"));
	        v.add(new Word("eye", "눈"));
	        v.add(new Word("statue", "조각상"));
	    }

	    private int makeExample(int ex[], int answerIndex) {
	        int n;
	        for (int i = 0; i < ex.length; i++)
	            ex[i] = -1;
	        int answerPosition = (int) (Math.random() * ex.length);
	        ex[answerPosition] = answerIndex;
	        for (int i = 0; i < ex.length; i++) {
	            if (ex[i] != -1)
	                continue;
	            do {
	                n = (int) (Math.random() * v.size());
	            } while (exists(ex, n));
	            ex[i] = n;
	        }
	        return answerPosition;
	    }

	    private boolean exists(int n[], int index) {
	        for (int i = 0; i < n.length; i++)
	            if (n[i] == index)
	                return true;
	        return false;
	    }

	    public void run() {
	        System.out.println("**** " + quizName + " ****");
	        System.out.println("-1을 입력하면 종료합니다.");
	        Scanner scanner = new Scanner(System.in);
	        while (true) {
	            int answerIndex = (int) (Math.random() * v.size());
	            Word answerWord = v.get(answerIndex);
	            int ex[] = new int[4];
	            int answerPosition = makeExample(ex, answerIndex);
	            System.out.println(answerWord.getEnglish() + "?");
	            for (int i = 0; i < ex.length; i++)
	                System.out.print("(" + (i + 1) + ")" + v.get(ex[i]).getKorean() + " ");
	            System.out.print(":>");
	            try {
	                int user = scanner.nextInt();
	                if (user == -1)
	                    break;
	                if (user - 1 == answerPosition)
	                    System.out.println("Excellent !!");
	                else
	                    System.out.println("No !!");
	            } catch (InputMismatchException e) {
	                scanner.next();
	                System.out.println("숫자를 입력하세요!");
	            }
	        }
	        scanner.close();
	        System.out.println("종료합니다...");
	    }

	    public static void main(String[] args) {
	        WordQuiz quiz = new WordQuiz("영어 단어 테스트");
	        quiz.run();
	    }
	}

}