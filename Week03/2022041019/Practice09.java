package AssignmentDay2;

public class foeachEx {
	enum Week {월,화,수,목,금,토,일}
	public static void main(String[] args) {
		int [] n = { 1,2,3,4,5 };
		String names[] = { "사과", "배", "바나나", "체리", "딸기", "포도" } ;
		int sum = 0;
		// 아래for-each에서k는n[0], n[1], ..., n[4]로반복
		for (int k : n) {
			System.out.print(k + " "); // 반복되는k 값 출력
			sum += k;
		}
		System.out.println("합은" + sum);
		// 아래for-each에서s는names[0], names[1], ..., names[5]로반복
		for (String s : names)
			System.out.print(s + " ");
		System.out.println();
		// 아래for-each에서day는월, 화, 수, 목, 금, 토, 일값으로반복
		for (Week day : Week.values())
			System.out.print(day + "요일");
		System.out.println();

	}

}
