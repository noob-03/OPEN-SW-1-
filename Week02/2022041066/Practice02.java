// 자동 타입 변환과 강제 타입 변화 코드

public class TypeConversion{
    public static void main(String[] args) {
        byte b = 127;
        int i= 100;
        System.out.println(b+i);    //227 출력
        System.out.println(10/4);   //2 출력
        System.out.println(10.0/4);     //2.5 출력 
        System.out.println((char)0x12340041);   //A 출력
        System.out.println((byte)(b+i));    //-29 출력
        System.out.println((int)2.9 + 1.8);     //3.8 출력
        System.out.println((int)(2.9 + 1.8));   //4 출력
        System.out.println((int)2.9 + (int)1.8);    //3 출력
    }
}
