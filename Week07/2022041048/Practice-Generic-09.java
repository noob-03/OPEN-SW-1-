package yoon_young_chan;

import java.util.*;

class Vocabulary { // 영어 단어와 그 뜻을 저장하는 클래스
    private String eng;
    private String kor;

    Vocabulary(String eng, String kor) {
        this.eng = eng;
        this.kor = kor;
    }

    public String getEng() {
        return eng;
    }

    public String getKor() {
        return kor;
    }
}

public class Hello2025 {
    private String title;
    private Vector<Vocabulary> words;
    private Scanner input = new Scanner(System.in);

    public Hello2025(String title) {
        this.title = title;
        words = new Vector<>();

        // 단어 데이터 추가
        words.add(new Vocabulary("love", "사랑"));
        words.add(new Vocabulary("animal", "동물"));
        words.add(new Vocabulary("emotion", "감정"));
        words.add(new Vocabulary("human", "인간"));
        words.add(new Vocabulary("stock", "주식"));
        words.add(new Vocabulary("trade", "거래"));
        words.add(new Vocabulary("society", "사회"));
        words.add(new Vocabulary("baby", "아기"));
        words.add(new Vocabulary("honey", "꿀"));
        words.add(new Vocabulary("dall", "인형"));
        words.add(new Vocabulary("bear", "곰"));
        words.add(new Vocabulary("picture", "사진"));
        words.add(new Vocabulary("painting", "그림"));
        words.add(new Vocabulary("fault", "오류"));
        words.add(new Vocabulary("example", "보기"));
        words.add(new Vocabulary("eye", "눈"));
        words.add(new Vocabulary("statue", "조각상"));
    }

    private boolean alreadyExists(int[] arr, int val) {
        for (int n : arr)
            if (n == val)
                return true;
        return false;
    }

    // 4개의 보기 중 랜덤하게 정답 위치를 배치하는 메서드
    private int createOptions(int[] options, int answerIdx) {
        Random rand = new Random();
        int answerPos = rand.nextInt(4);
        options[answerPos] = answerIdx;

        for (int i = 0; i < 4; i++) {
            if (i == answerPos)
                continue;
            int wrong;
            do {
                wrong = rand.nextInt(words.size());
            } while (wrong == answerIdx || alreadyExists(options, wrong));
            options[i] = wrong;
        }
        return answerPos + 1;
    }

    public void start() {
        System.out.println("\"" + title + "\"의 단어 테스트를 시작합니다. -1을 입력하면 종료합니다.");
        System.out.println("현재 " + words.size() + "개의 단어가 들어 있습니다.");

        while (true) {
            int answerIdx = (int) (Math.random() * words.size());
            Vocabulary answer = words.get(answerIdx);

            int[] options = new int[4];
            int correct = createOptions(options, answerIdx);

            System.out.println(answer.getEng() + "?");
            for (int i = 0; i < 4; i++) {
                System.out.print("(" + (i + 1) + ")" + words.get(options[i]).getKor() + "  ");
            }

            int choice;
            while (true) {
                System.out.print(":>");
                try {
                    choice = input.nextInt();
                    break;
                } catch (InputMismatchException e) {
                    System.out.println("숫자(1~4)를 입력해야 합니다. 다시 시도하세요.");
                    input.next();
                }
            }

            if (choice == -1) {
                System.out.println("\"" + title + "\"" + "를 종료합니다.");
                break;
            } else if (choice == correct) {
                System.out.println("Excellent !!");
            } else {
                System.out.println("No !!");
            }
        }
        input.close();
    }

    public static void main(String[] args) {
    	Hello2025 quiz = new Hello2025("명품영어");
        quiz.start();
    }
}

