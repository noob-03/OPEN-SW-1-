package yoon_young_chan;

import java.io.*;
import java.util.*;

public class Hello2025 {
    private String answer;
    private StringBuilder hidden;
    private WordList wordList;
    private int life;
    private Scanner scan;

    public void start() {
        System.out.println("지금부터 행맨 게임을 시작합니다.");
        wordList = new WordList("words.txt");
        scan = new Scanner(System.in);
        play();
        scan.close();
    }

    // 단어 선택 + 두 글자 가리기
    private void setHiddenWord() {
        answer = wordList.pickWord();
        if (answer == null) {
            System.out.println("단어 목록이 비어 있어 게임을 시작할 수 없습니다.");
            return;
        }

        hidden = new StringBuilder(answer);
        Random rand = new Random();
        int prev = -1;
        int count = 0;

        while (count < 2) {
            int idx = rand.nextInt(answer.length());
            if (idx != prev) {
                hidden.setCharAt(idx, '-');
                prev = idx;
                count++;
            }
        }
    }

    private void play() {
        while (true) {
            setHiddenWord();
            life = 5;
            String again = "n";

            while (life > 0) {
                System.out.println(hidden);
                System.out.print(">> ");
                String input = scan.next().toLowerCase();
                char ch = input.charAt(0);

                if (!check(ch)) {
                    life--;
                }

                if (hidden.toString().equals(answer)) {
                    System.out.println(answer);
                    System.out.print("Next(y/n)? ");
                    again = scan.next().toLowerCase();
                    break;
                }
            }

            if (!hidden.toString().equals(answer)) {
                System.out.println("5번 실패 하였습니다.");
                System.out.println(answer);
                System.out.print("Next(y/n)? ");
                again = scan.next().toLowerCase();
            }

            if (again.equals("n")) break;
        }
    }

    // 사용자가 입력한 문자가 숨겨진 글자와 일치하는지 확인
    private boolean check(char ch) {
        boolean found = false;
        for (int i = 0; i < hidden.length(); i++) {
            if (hidden.charAt(i) == '-' && answer.charAt(i) == ch) {
                hidden.setCharAt(i, ch);
                found = true;
            }
        }
        return found;
    }

    public static void main(String[] args) {
    	Hello2025 game = new Hello2025();
        game.start();
    }
}

// 단어를 읽고 랜덤으로 선택하는 클래스
class WordList {
    private Vector<String> words = new Vector<>();

    public WordList(String fileName) {
        try (Scanner fileScan = new Scanner(new FileReader(fileName))) {
            while (fileScan.hasNextLine()) {
                String line = fileScan.nextLine().trim();
                if (!line.isEmpty()) {
                    words.add(line);
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("오류: " + fileName + " 파일을 찾을 수 없습니다.");
            System.exit(1);
        } catch (IOException e) {
            System.out.println("파일 입출력 오류: " + e.getMessage());
            System.exit(1);
        }
    }

    public String pickWord() {
        if (words.isEmpty()) return null;
        int index = (int) (Math.random() * words.size());
        return words.get(index);
    }
}

