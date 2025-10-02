import java.util.Scanner;

public class WordGameApp {
	int number;	//참가인원
	Player[] players;
	Scanner scanner;
	
	public WordGameApp() {
		scanner = new Scanner(System.in);
	}
	
	private void createPlayers() {
		System.out.print("게임에 참가하는 인원은 몇명입니까>>");
		number = scanner.nextInt();
		players = new Player[number];
		for(int i = 0 ; i < number ; i++) {
			System.out.print("참가자의 이름을 입력하세요>>");
			String name = scanner.next();
			players[i] = new Player(name);
		}
	}
	
	public Boolean checkSuccess(String lastWord, String newWord) {
		int lastIndex = lastWord.length()-1;
		char lastChar = lastWord.charAt(lastIndex);
		char FirstChar = newWord.charAt(0);
		if(lastChar == FirstChar)
			return true;
		else
			return false;
	}
	
	public void run() {
		System.out.println("끝말잇기 게임을 시작합니다...");
		createPlayers();
		System.out.println("시작하는 단어는 아버지입니다");
		String lastWord = "아버지";
		int turn = 0;	//순서를 기록
		while(true) {
			int currentPlayerIndex = turn % number;
			String newWord = players[currentPlayerIndex].getWordFromUser(scanner);
			if(checkSuccess(lastWord, newWord) == false) {
				System.out.println(players[currentPlayerIndex].name + "이(가) 졌습니다.");
				break;
			}
			lastWord = newWord;
			turn++;
		}
		scanner.close();
	}
	
	public static void main(String[]args) {
		WordGameApp game = new WordGameApp();
		game.run();
		
	}
}

class Player{
	String name;
	public Player(String name) {
		this.name = name;
	}
	
	public String getWordFromUser(Scanner scanner) {
		System.out.print(this.name + ">>");
		String word = scanner.next();
		return word;
	}
}
