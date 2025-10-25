package yoon_young_chan;

public class Hello2025{
	public static void main(String[] args) {
		StringBuffer sb = new StringBuffer("This");
		sb.append(" is pencil"); 
		System.out.println(sb);
		sb.insert(7, " my"); 
		System.out.println(sb);
		sb.replace(8, 10, "your"); 
		System.out.println(sb);
		sb.delete(8, 13); 
		System.out.println(sb);
		sb.setLength(4); 
		System.out.println(sb);
	}
}
/*This is pencil
This is my pencil
This is your pencil
This is pencil
This*/

