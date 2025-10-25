package yoon_young_chan;

import java.util.*;
public class Hello2025{
	public static void main(String[] args) {
		HashMap<String, String> dic= new HashMap<String, String>();
		dic.put("baby", "아기");
		dic.put("love", "사랑");
		dic.put("apple", "사과");
		Scanner scanner= new Scanner(System.in);
		while(true) {
			System.out.print("찾고싶은단어는?");
			String eng= scanner.next();
			if(eng.equals("exit")) {
				System.out.println("종료합니다...");
				break;
			}
			String kor = dic.get(eng);
			if(kor == null)
				System.out.println(eng+ "는없는단어입니다.");
			else
				System.out.println(kor);
		}
		scanner.close();
	}
}
