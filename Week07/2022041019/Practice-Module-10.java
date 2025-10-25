package Assignments;

public class Practice10 {
    public static void main(String[] args) {
        System.out.println(Math.PI);
        System.out.println(Math.ceil(3.14));
        System.out.println(Math.floor(3.78));
        System.out.println(Math.sqrt(9));
        System.out.println(Math.exp(2));
        System.out.println(Math.round(3.14));
        System.out.print("이번주행운의번호는");

        for(int i=0; i<5; i++)
            System.out.print((int)(Math.random()*45 + 1) + " ");
    }
}
