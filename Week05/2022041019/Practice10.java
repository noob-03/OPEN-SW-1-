package Assignment3;

class Sample {
	public int a;
	private int b;
	int c;
}

public class Practice10 {
	public static void main(String[] args) {
		Sample aClass = new Sample();
		aClass.a = 10;
		aClass.b = 10; // b는 private으로 선언되있기때문에 다른 클래스에서 접근이 불가능하
		aClass.c = 10;

	}

}
