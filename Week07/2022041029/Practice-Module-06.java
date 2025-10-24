public class AutoBoxingUnBoxingEx {
    public static void main(String[] args){
        int n = 10;
        Integer intObject = n;
        System.out.println("intObject="+intObject);

        int m = intObject + 10;
        System.out.println("m="+m);
    }
}
/*
출력결과
intObject=10
m=20
 */
