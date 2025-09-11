import java.util.Scanner;

public class wwe1104 {
  public static void main(String[] args) {
		Scanner scanner= new Scanner(System.in);
		System.out.println("가위바위보 게임입니다. 가위, 바위, 보 중에서 입력하세요");
		
		System.out.print("철수 >>");
		String name1 = scanner.next();
		
		System.out.print("영희 >>");
		String name2 = scanner.next();
		
		String var="";
		if (name1.equals("보") && name2.equals("가위")) 
            var = "영희";
        else if (name1.equals("가위") && name2.equals("바위")) 
            var = "영희";
        else if (name1.equals("바위") && name2.equals("보")) 
            var = "영희";
        else if (name1.equals("가위") && name2.equals("보")) 
            var = "철수";
        else if (name1.equals("바위") && name2.equals("가위")) 
            var = "철수";
        else if (name1.equals("보") && name2.equals("바위")) 
            var = "철수";
        else if (name1.equaㅁls(name2)) 
            var = "비김";
		System.out.print(var+"가 이겼습니다");
		
		scanner.close();
}
}
