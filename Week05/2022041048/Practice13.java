import java.util.Scanner;

class Player {
    private String name; // 플레이어 이름
    private Scanner sc = new Scanner(System.in);

    public Player(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    // 사용자로부터 단어 입력받기
    public String getWordFromUser() {
        System.out.print(name + ">> ");
        return sc.next();
    }
    // 끝말잇기 성공 여부 확인
    public boolean checkSuccess(String prevWord, String currentWord) {
        int lastIndex = prevWord.length() - 1;
        char lastChar = prevWord.charAt(lastIndex);
        char firstChar = currentWord.charAt(0);
        return (lastChar == firstChar);
    }
}
public class WordGameApp {
    private Player[] players;  // 플레이어 배열
    private int num;           // 인원 수
    private Scanner sc = new Scanner(System.in);

    public WordGameApp(int num) {
        this.num = num;
        players = new Player[num];
        for (int i = 0; i < num; i++) {
            System.out.print("참가자의 이름을 입력하세요>> ");
            String name = sc.next();
            players[i] = new Player(name);
        }
    }
    public void run() {
        System.out.println("끝말잇기 게임을 시작합니다...");
        System.out.println("시작하는 단어는 아버지입니다.");
        String word = "아버지";  // 시작 단어
        int turn = 0;
        while (true) {
            Player currentPlayer = players[turn % num];
            String newWord = currentPlayer.getWordFromUser();
            if (!currentPlayer.checkSuccess(word, newWord)) {
                System.out.println(currentPlayer.getName() + "이(가) 졌습니다.");
                break;
            }
            word = newWord; // 이어가기
            turn++;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("게임에 참가하는 인원은 몇명입니까>> ");
        int n = sc.nextInt();
        WordGameApp game = new WordGameApp(n);
        game.run();
    }
}

