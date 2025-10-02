package Assignment3;

import java.util.Scanner;

public class WordGameApp {
	Scanner input = new Scanner(System.in);
	Player [] players;
	String word = "아버지";
	
	public WordGameApp() { // 생성자 메소
		
	}
	private void createPlayers() { // 게임 참가자 수를 입력받고 Player[]을 생성하는 메소드
		System.out.println("끝말잇기 게임을 시작합니다...");
		System.out.print("게임을 참가하는 인원은 몇명입니까>>");
		

		int n = input.nextInt();
		
		players = new Player[n];
		
		for(int i=0; i<players.length; i++) {
			System.out.print("참가자의 이름을 입력하세요>>");
			players[i] = new Player();
			players[i].name = input.next();
		}
		
	}
	public Boolean checkSuccess(String lastWord, String newWord) { // lastWord 와 newWord를비교하는메소드
		int lastIndex = word.length()-1;
		char lastChar = word.charAt(lastIndex);
		char FirstChar = newWord.charAt(0);
		if(lastChar != FirstChar)
			return false;
		return true; 
	}
	public void run() { // 게임을 진행하는 메소드
		createPlayers();
		while(true) {
			for(int i=0; i<players.length; i++) {
				String newWord = players[i].getWordFromUser(input);
				if(!checkSuccess(word,newWord)) {
					System.out.println(players[i].name + "이 졌습니다.");
					return;
				}
				word = newWord;
			}
		}
	}

	public static void main(String[] args) { // 메인 메소드
		new WordGameApp().run();
	}
	
}

class Player {
	String name;
	String word;
	
	public String getWordFromUser(Scanner input) { // 사용자로부터 단어를 입력받는 메소드
		System.out.print(name + ">>");
		String word = input.next();
		return word;
	}
}
