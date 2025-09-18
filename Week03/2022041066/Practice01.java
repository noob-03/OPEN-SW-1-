//for 문을 이용하여 1에서 10까지 덧셈으로 표시하고 합을 출력
public class ForSample{
    public static void main(String[] args) {
        int sum=0;

        for(int i=1; i<=10; i++) { // 1~10까지반복
            sum += i;
            System.out.print(i); // 더하는수출력
                
            if(i<=9) // 1~9까지는'+' 출력
                 System.out.print("+");
            else { // i가10인경우
                System.out.print("="); // '=' 출력하고
                System.out.print(sum); // 덧셈결과: 1+2+3+4+5+6+7+8+9+10=55 출력
            }
        }
    }   
}
