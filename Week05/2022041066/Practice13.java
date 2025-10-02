import java.util.Scanner;

/**
 * Player 클래스: 게임 참가자를 나타냅니다.
 * 이름(name) 필드와 관련된 메소드를 가집니다.
 */
class Player {
    private String name; // 참가자의 이름을 저장하는 필드

    // 생성자: 이름을 받아 Player 객체를 생성합니다.
    public Player(String name) {
        this.name = name;
    }

    // 이름을 반환하는 메소드
    public String getName() {
        return name;
    }
}

/**
 * WordGameApp 클래스: 끝말잇기 게임의 전체 실행을 담당합니다.
 */
public class WordGameApp {
    private Player[] players; // 참가자들을 저장할 Player 객체 배열
    private Scanner scanner;  // 사용자 입력을 받기 위한 Scanner 객체

    // 생성자: Scanner 객체를 초기화합니다.
    public WordGameApp() {
        scanner = new Scanner(System.in);
    }

    /**
     * 게임 참가자 수를 입력받고, 각 참가자의 이름을 받아 Player 객체를 생성하여 배열에 저장하는 메소드
     */
    private void createPlayers() {
        System.out.print("게임에 참가하는 인원은 몇명입니까>>");
        int numPlayers = scanner.nextInt();
        players = new Player[numPlayers]; // 입력받은 인원수만큼 배열 공간 생성

        for (int i = 0; i < numPlayers; i++) {
            System.out.print("참가자의 이름을 입력하세요>>");
            String name = scanner.next();
            players[i] = new Player(name); // Player 객체를 생성하여 배열에 저장
        }
    }

    /**
     * 끝말잇기의 성공 여부를 판별하는 메소드
     * @param lastWord 이전 단어
     * @param newWord 새로 입력된 단어
     * @return 끝말잇기 성공 시 true, 실패 시 false
     */
    public boolean checkSuccess(String lastWord, String newWord) {
        int lastIndex = lastWord.length() - 1;
        char lastChar = lastWord.charAt(lastIndex); // 이전 단어의 마지막 문자
        char firstChar = newWord.charAt(0);         // 새 단어의 첫 문자

        if (lastChar == firstChar) {
            return true; // 두 문자가 같으면 성공
        } else {
            return false; // 다르면 실패
        }
    }

    /**
     * 게임을 전체적으로 실행하는 메소드
     */
    public void run() {
        System.out.println("끝말잇기 게임을 시작합니다...");
        createPlayers(); // 참가자 설정
        
        String lastWord = "아버지"; // 시작 단어 설정
        System.out.println("시작하는 단어는 " + lastWord + "입니다.");

        int currentPlayerIndex = 0; // 게임 순서는 0번 참가자부터 시작
        
        while (true) {
            // 현재 차례의 참가자 객체를 가져옴
            Player currentPlayer = players[currentPlayerIndex];
            
            System.out.print(currentPlayer.getName() + ">>");
            String newWord = scanner.next(); // 현재 참가자로부터 단어를 입력받음

            // 끝말잇기 성공 여부 판별
            if (!checkSuccess(lastWord, newWord)) {
                System.out.println(currentPlayer.getName() + "이(가) 졌습니다.");
                break; // 실패 시 while 루프 종료
            }

            // 성공했다면, 다음 차례를 위해 현재 단어를 이전 단어로 설정
            lastWord = newWord;
            
            // 다음 참가자로 순서를 넘김 (예: 3명일 경우 0 -> 1 -> 2 -> 0 -> ...)
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        }
    }

    /**
     * 프로그램의 시작점, main 메소드
     */
    public static void main(String[] args) {
        WordGameApp game = new WordGameApp(); // WordGameApp 객체 생성
        game.run(); // 게임 실행
    }
}
