package Sample;

import java.util.Scanner;

public class Practice13{
	
	static class Player{
		String name;
		Scanner scanner = new Scanner(System.in);
		
		public Player(String name) {
			this.name = name;
		}
		
		public String getWordFromUser() {
			System.out.print(name+">> ");
			return scanner.next();
		}
	}
	
	public static class WordGameApp{
		private Player[] players;
		private int n;
		private Scanner scanner = new Scanner(System.in);
		
		public WordGameApp() {
			createPlayer();
		}
		
		void createPlayer() {
			System.out.print("게임에 참가하는 인원은 몇명입니까>>");
			n = scanner.nextInt();
			players = new Player[n];
			for(int i = 0; i < n; i++) {
				System.out.print("참가자의 이름을 입력하세요 >>");
				String name = scanner.next();
				players[i] = new Player(name);
			}
		}
		
		public boolean checkSuccess(String lastword, String newword) {
			int lastindex = lastword.length() -1;
			char lastchar = lastword.charAt(lastindex);
			char firstChar = newword.charAt(0);
			return(lastchar == firstChar);
		}
		
		public void run() {
	        System.out.println("끝말잇기 게임을 시작합니다...");
	        String word = "아버지";
	        System.out.println("시작하는 단어는 " + word + "입니다.");

	        int i = 0;
	        while (true) {
	            String newWord = players[i].getWordFromUser();
	            if (!checkSuccess(word, newWord)) { // 규칙 위반
	                System.out.println(players[i].name + "이(가) 졌습니다.");
	                break;
	            }
	            word = newWord; 
				i = (i + 1) % n;
	        }
	    }
		
		public static void main(String[] args) {
	        WordGameApp game = new WordGameApp();
	        game.run();
	    }
	}

}
