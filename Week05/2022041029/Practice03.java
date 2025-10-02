public class Circle {
	int radius;
	String name;
	public Circle() { // 매개변수없는생성자
		radius = 1; name = ""; // 필드초기화. radius 의초기값은1
	}
	public Circle(int r, String n) { // 매개변수를가진생성자
		radius = r; name = n; // 매개변수로필드초기화
	}
	public double getArea() {
		return 3.14*radius*radius;
	}
	public static void main(String[] args) {
		Circle pizza = new Circle(10, "자바피자"); // Circle 객체생성, 반지름10
		double area = pizza.getArea();
		System.out.println(pizza.name + "의면적은" + area);
		Circle donut = new Circle(); // Circle 객체생성, 반지름1
		donut.name = "도넛피자"; // 이름변경
		area = donut.getArea();
		System.out.println(donut.name + "의면적은" + area);
	}
}
