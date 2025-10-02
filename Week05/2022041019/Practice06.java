package Assignment3;

class CircleSix {
	int radius;
	public CircleSix(int radius) {
		this.radius = radius;
	}
	public double getArea() {
		return 3.14*radius*radius;
	}

	

}

public class Practice06 {
	public static void main(String[] args) {
		CircleSix [] c;
		c = new CircleSix[5];
		
		for(int i=0; i<c.length; i++)
			c[i] = new CircleSix(i);
		
		for(int i=0; i<c.length; i++)
			System.out.print((int)(c[i].getArea()) + " ");
	}
}
