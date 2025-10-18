package Sample;

import java.util.Scanner;

public class Practice5{
	static class Shape { 
	    public Shape next;
	    public Shape() { next = null; }
	    public void draw() {
	        System.out.println("Shape");
	    }
	}
	static class Line extends Shape {
	    public void draw() { 
	        System.out.println("Line");
	    }
	}
	static class Rect extends Shape {
	    public void draw() { 
	        System.out.println("Rect");
	    }
	}
	static class Circle extends Shape {
	    public void draw() { 
	        System.out.println("Circle");
	    }
	}
	static public class MethodOverridingEx{
	    static void paint(Shape p) {
	        p.draw();
	    }
	    public static void main(String[] args) {
	        Line line= new Line();
	        paint(line);
	        paint(new Shape());
	        paint(new Line());
	        paint(new Rect());
	        paint(new Circle());
	    }
	}
}