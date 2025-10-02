package Sample;

import java.util.Scanner;

public class Practice09{
	public class GarbageEx{
		public static void main(String[] args) {
			String a = new String("Good");
			String b = new String("Bad");
			String c = new String("Normal");
			String d, e;
			a = null; // 가비지 발생
			d = c;
			c = null; // 가비지 발생
		} // 가비지 발생
	}

}
