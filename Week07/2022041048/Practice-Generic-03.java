package yoon_young_chan;

import java.util.*;
public class Hello2025{
	public static void main(String[] args) {
		ArrayList<String> a = new ArrayList<String>();
		Scanner scanner= new Scanner(System.in);
		for(int i=0; i<4; i++) {
			System.out.print("이름을입력하세요>>");
			String s = scanner.next();
			a.add(s); 
		}
		for(int i=0; i<a.size(); i++) {
			String name = a.get(i);
			System.out.print(name + " ");
		}
	}
}
