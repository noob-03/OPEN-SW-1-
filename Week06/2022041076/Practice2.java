package Sample;
import java.util.Scanner;

public class Practice2{
	
	static class Person {
		private int weight;
		int age;
		protected int height;
		public String name;
		public void setWeight(int weight) {
			this.weight= weight;
		}
		public int getWeight() {
			return weight;
		}
	}
	
	static class Student extends Person {
		public void set() {
		age = 30;
		name = "홍길동";
		height = 175;
		setWeight(99);
		}
		}
		public class InheritanceEx{
			public static void main(String[] args) {
				Student s = new Student();
				s.set();
			}
		}


}