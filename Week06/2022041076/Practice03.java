package Sample;

import java.util.Scanner;

public class Practice03{
	
	static class Point3 {
	    private int x, y;
	    public Point3() {
	        this.x= this.y= 0;
	    }
	    public Point3(int x, int y) {
	        this.x= x; this.y= y;
	    }
	    public void showPoint() { 
	        System.out.println("(" + x + "," + y + ")");
	    }
	}
	static class ColorPoint3 extends Point3 {
	    private String color; 
	    public ColorPoint3(int x, int y, String color) {
	        super(x, y);
	        this.color= color;
	    }
	    public void showColorPoint() {
	        System.out.print(color);
	        showPoint();
	    }
	}
	public class SuperEx{
	    public static void main(String[] args) {
	        ColorPoint3 cp = new ColorPoint3(5, 6, "blue");
	        cp.showColorPoint();
	    }
	}

}
