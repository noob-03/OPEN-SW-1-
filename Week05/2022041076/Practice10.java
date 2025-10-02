package Sample;

import java.util.Scanner;
	public class Practice10 {
		static class Sample {
			public int a;
			private int b;
			int c;
		}
		public class AccessEx{
			public static void main(String[] args) {
				Sample aClass= new Sample();
				aClass.a= 10;
				aClass.b= 10; // private인데 접근하려고 함, 컴파일 에러 발생
				aClass.c= 10;
			}
		}
}