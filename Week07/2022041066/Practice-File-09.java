package org.example;

import java.util.*;
import java.io.*;

public class HangManGameApp {
    private String newWord;          // 선택된 원본 단어
    private StringBuffer hiddenWord; // 숨겨진 단어 (- 포함)
    private int failCount = 0;       // 틀린 횟수
    private Scanner scanner;         // Scanner를 전역으로 선언

    // 게임을 시작하는 메소드
    public void run() {
        scanner = new Scanner(System.in);
        System.out.println("행맨 게임 시작합니다.");

        while (true) {
            // 선택된 단어 newWord에 2개의 글자를 숨긴 단어인 hiddenWord를 만든다.
            Words words = new Words("/Users/gimjinsig/Desktop/Desktop - 김진식’s MacBook Pro/University/2-2/오픈소스/opensource_2025_2/src/main/resources/words.txt");
            newWord = words.getRandomWord();
            makeHidden();

            // 사용자 게임 입력받으면서 행맨 게임을 진행한다. 5번 틀리면 종료하며, 한 단어 진행 후 y/n 물으며 입력하면 종료한다.
            go();

            // 계속 진행 여부 물어보기
            System.out.print("Next(y/n)?");
            String answer = scanner.nextLine();
            if (answer.equals("n")) {
                break;
            }

            // 다음 게임을 위해 초기화
            failCount = 0;
        }
        scanner.close();
    }

    // 선택된 단어 newWord에 2개의 글자를 숨긴 단어인 hiddenWord를 만든다.
    private void makeHidden() {
        hiddenWord = new StringBuffer(newWord);

        Random random = new Random();
        // 중복되지 않는 2개의 위치를 선택
        Set<Integer> positions = new HashSet<>();
        while (positions.size() < 2) {
            int pos = random.nextInt(newWord.length());
            positions.add(pos);
        }

        // 선택된 위치의 문자를 '-'로 변경
        for (int pos : positions) {
            hiddenWord.setCharAt(pos, '-');
        }

        System.out.println(hiddenWord);
    }

    // 사용자 게임 입력받으면서 행맨 게임을 진행한다. 5번 틀리면 종료하며, 한 단어 진행 후 y/n 물으며 입력하면 종료한다.
    private void go() {
        while (true) {
            System.out.print(">>");
            String input = scanner.nextLine();

            if (input.length() != 1) {
                System.out.println("한 글자만 입력하세요!");
                continue;
            }

            char key = input.charAt(0);

            if (complete(key)) {
                // 정답을 맞춘 경우
                System.out.println(hiddenWord);

                // 모든 글자를 맞췄는지 확인
                if (hiddenWord.indexOf("-") == -1) {
                    System.out.println(newWord + " 선택 완료!");
                    break;
                }
            } else {
                // 틀린 경우
                failCount++;
                System.out.println("틀렸습니다. 남은 기회: " + (5 - failCount));

                if (failCount >= 5) {
                    System.out.println("5번 틀렸습니다. 실패!");
                    break;
                }
            }
        }
    }

    // 사용자가 입력한 문자 key가 숨긴 글자와 일치하는지 검사하고 일치하면 true를 리턴하고, hiddenWord의 '-'를 key 문자로 변경한다.
    private boolean complete(char key) {
        boolean found = false;

        // newWord에서 key와 일치하는 위치를 찾아 hiddenWord의 '-'를 변경
        for (int i = 0; i < newWord.length(); i++) {
            if (newWord.charAt(i) == key && hiddenWord.charAt(i) == '-') {
                hiddenWord.setCharAt(i, key);
                found = true;
            }
        }

        return found;
    }

    public static void main(String[] args) {
        HangManGameApp app = new HangManGameApp();
        app.run();
    }
}

// words.txt 파일을 읽고 벡터에 저장하고 벡터로부터 랜덤하게 단어를 추출하는 클래스
class Words {
    private Vector<String> wordVector = new Vector<String>();

    public Words(String fileName) {
        try {
            Scanner scanner = new Scanner(new FileReader(fileName));
            while (scanner.hasNext()) {
                String word = scanner.nextLine();
                wordVector.add(word);
            }
            scanner.close();
        } catch (IOException e) {
            System.out.println("파일을 찾을 수 없습니다: " + fileName);
            e.printStackTrace();
        }
    }

    public String getRandomWord() {
        if (wordVector.isEmpty()) {
            return "default"; // 파일이 비어있을 경우 기본값
        }
        Random random = new Random();
        int index = random.nextInt(wordVector.size());
        return wordVector.get(index);
    }
}
