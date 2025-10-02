class Circle {
	int radius;
	public Circle(int radius) {
		this.radius= radius;
	}
	public double getArea() {
		return 3.14*radius*radius;
	}
}
public class CircleArray{
	public static void main(String[] args) {
		Circle[] c; // Circle 배열에대한레퍼런스c 선언
		c = new Circle[5]; // 5개의레퍼런스배열생성
		for(int i=0; i<c.length; i++) // 배열의개수만큼i번째원소객체생성
			c[i] = new Circle(i); 
		for(int i=0; i<c.length; i++) // 배열의모든Circle 객체의면적출력
			System.out.print((int)(c[i].getArea()) + " ");
	}
}
