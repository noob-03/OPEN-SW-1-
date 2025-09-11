//switch 문을이용한 커피메뉴의 가격을 알려주는 프로그램

import java.util.Scanner;

public class CoffeePrice{
    public static void main(String[] args) {
        Scanner scanner= new Scanner(System.in, "UTF-8");
        System.out.print("무슨커피드릴까요? ");
        String order = scanner.next();
        int price=0;
        switch (order) {
            case "에스프레소":
            case "카푸치노":
            case "카페라떼":
                price = 3500;  //에스프레소, 카푸치노, 카페라떼는3500원이다
                break;
            case "아메리카노" :
                price = 2000;  // 아메리카노는2,000원이다
                break;
            default:
                System.out.println("메뉴에없습니다!");
        }
        if(price != 0)
            System.out.print(order + "는" + price + "원입니다");
        scanner.close();
    }
}

