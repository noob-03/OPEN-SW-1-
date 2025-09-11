//조건연산자의사례중 하나이다. 실행결과는 무엇인가?

public class TernaryOperator{
    public static void main (String[] args) {
        int a = 3, b = 5;
        
        System.out.println("두수의차는" + ((a>b)?(a-b):(b-a)));
    }
}

//출력값 : 두수의차는2

