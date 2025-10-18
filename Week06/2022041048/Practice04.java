package yoon_young_chan;


class Person { }
class Student extends Person { }
class Researcher extends Person { }
class Professor extends Researcher { }

public class Hello2025{
	static void print(Person p) {
		if(p instanceof Person)
			System.out.print("Person ");
		if(p instanceof Student)
			System.out.print("Student ");
		if(p instanceof Researcher)
			System.out.print("Researcher ");
		if(p instanceof Professor)
			System.out.print("Professor ");
		System.out.println();
	}
	public static void main(String[] args) {
		System.out.print("new Student() ->\t"); System.out.print(new Student());
		System.out.print("new Researcher() ->\t"); System.out.print(new Researcher());
		System.out.print("new Professor() ->\t"); System.out.print(new Professor());
	}
}
//결과값 new Student() ->	yoon_young_chan.Student@6e2c634bnew Researcher() ->	yoon_young_chan.Researcher@7e6cbb7anew Professor() ->	yoon_young_chan.Professor@7106e68e
