package Sample;
import java.util.Random;
import java.util.Scanner;

public class Practice10 {

	public class MathEx{
		public static void main(String[] args) {
			System.out.println(Math.PI); 
			System.out.println(Math.ceil(a)); 
			System.out.println(Math.floor(a)); 
			System.out.println(Math.sqrt(9)); 
			System.out.println(Math.exp(2)); 
			System.out.println(Math.round(3.14)); 
		
			System.out.print("이번주행운의번호는");
			for(int i=0; i<5; i++)
				System.out.print((int)(Math.random()*45 + 1) + " ");
		}
	}
}