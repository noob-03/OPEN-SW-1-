package Sample;
import java.util.Vector;

public class Practice01{
	
	public static void main(String[] args) { 
		Vector<Integer> v = new Vector<Integer>();
		v.add(5); 
		v.add(4); 
		v.add(-1); 
		v.add(2, 100); 
		System.out.println("벡터내의요소객체수: " + v.size());
		System.out.println("벡터의현재용량: " + v.capacity());
		for(int i=0; i<v.size(); i++) { 
			int n = v.get(i);
			System.out.println(n);
		}
		int sum = 0;
		for(int i=0; i<v.size(); i++) { 
			int n = v.elementAt(i);
			sum += n;
		}
		System.out.println("벡터에있는정수합: " + sum);
	}
}
