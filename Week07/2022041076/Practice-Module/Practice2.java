package Sample;
import java.util.Scanner;

public class Practice2{
	
	static class Point {
		private int x, y;
		public Point(int x, int y) {
			this.x= x;
			this.y= y;
		}
		
		public String toString() {
			return "Point(" + x + "," + y + ")";
		}
	}
	public class ToStringEx{
		public static void main(String [] args) {
			Point p = new Point(2,3);
			System.out.println(p.toString());
			System.out.println(p); // p는p.toString()으로자동변환
			System.out.println(p + "입니다."); // p.toString() + "입니다"로자동변환
		}
	}

}