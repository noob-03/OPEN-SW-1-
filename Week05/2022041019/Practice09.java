package Assignment3;

public class Practice09 {

	public static void main(String[] args) {
		String a = new String("Good");
		String b = new String("Bad");
		String c = new String("Normal");
		String d,e;
		a = null; // 가비지 콜랙션 발생
		d = c;
		c = null; // 가비지 콜랙션 발생
	}
}
