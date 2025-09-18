//사용자가 명령행에 입력한 실수를 main() 메소드에서 전달받아 합계를 계산
public class Calc {
    public static void main (String[] args) {
        double sum = 0.0;
    
        for (int i=0; i<args.length; i++) // 인자 개수 만큼 반복
            sum += Double.parseDouble(args[i]); // 문자열을 실수(double 타입)로 변환하여 합산
    
        System.out.println("합계:" + sum);
    }
}

//출력 값 합계: 0.0
