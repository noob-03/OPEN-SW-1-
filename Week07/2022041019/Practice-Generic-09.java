package org.example;

import java.util.InputMismatchException;
import java.util.Scanner;
import java.util.Vector;

class Word {
    public String korean;
    public String english;
    Word(String english, String korean){
        this.english = english;
        this.korean = korean;
    }
}

public class WordQuiz {
    private String name;
    private Vector<Word> v;
    Scanner scanner = new Scanner(System.in);

    public WordQuiz(String name) {
        this.name = name;
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
        v.add(new Word("dall", "인형"));
        v.add(new Word("bear", "곰"));
        v.add(new Word("picture", "사진"));
        v.add(new Word("painting", "그림"));
        v.add(new Word("fault", "오류"));
        v.add(new Word("example", "보기"));
        v.add(new Word("eye", "눈"));
        v.add(new Word("statue", "조각상"));
    }
    private int makeExample(int ex[], int answerIndex) {
        int wrongAnsIndex;
        int correctAnsIndex = (int) (Math.random() * 4);
        ex[correctAnsIndex] = answerIndex;
        for(int i=0; i<4; i++){
            if(i == correctAnsIndex)
                continue;
            wrongAnsIndex = (int) (Math.random() * v.size());
            while(wrongAnsIndex == correctAnsIndex || exists(ex,wrongAnsIndex)){
                wrongAnsIndex = (int) (Math.random() * v.size());
            }
            ex[i] = wrongAnsIndex;
        }

        return correctAnsIndex;
    }
    private boolean exists(int n[], int index ) {
        for(int i = 0 ; i < n.length ; i++){
            if(n[i] == index)
                return true;
        }
        return false;
    }
    public void run() {
        System.out.println("\"" + this.name + "\"의 단어 테스트를 시작합니다. -1을 입력하면 종료합니다.");
        System.out.println("현재 " + v.size() + "개의 단어가 들어 있습니다.");
        while (true) {
            int answerIndex = (int) (Math.random() * v.size());
            Word ansWord = v.get(answerIndex);
            System.out.println(ansWord.english + "?");

            int[] opt = new int[4];
            int userChoice;

            int ansWhere = makeExample(opt, answerIndex);
            for (int i = 0; i < 4; i++) {
                String optionName = v.get(opt[i]).korean;
                System.out.print("(" + (i + 1) + ")" + optionName + "  ");
            }
            System.out.print(":>");
            userChoice = scanner.nextInt() - 1;
            if(userChoice == -2){
                System.out.println("\"" + this.name + "\"" + "를 종료합니다.");
                break;
            }
            else if(userChoice == ansWhere){
                System.out.println("Excellent !!");
            }
            else{
                System.out.println("NO. !!");
            }
        }
    }
    public static void main(String[] args) {
        WordQuiz game = new WordQuiz("명품영어");
        game.run();
    }
}
