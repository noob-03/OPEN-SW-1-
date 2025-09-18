package Sample;

import java.util.Scanner;

public class Practice3{
	public static void main(String args[]) {
		char c = 'a';
		
		do {
			System.out.print(c);
			c = (char)(c+1);
		}while(c <= 'z');
	}
}