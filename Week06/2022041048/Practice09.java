package yoon_young_chan;

// 기본 Phone 인터페이스
interface PhoneInterface {
    final int TIMEOUT = 10000; // 상수 필드
    void sendCall();           // 추상 메서드
    void receiveCall();        // 추상 메서드

    default void printLogo() { // default 메서드
        System.out.println("** Phone **");
    }
}


interface MobilePhoneInterface extends PhoneInterface {
    void sendSMS();
    void receiveSMS();
}

interface MP3Interface {
    void play();
    void stop();   
}

class PDA {
    public int calculate(int x, int y) {
        return x + y;
    }
}

class SmartPhone extends PDA implements MobilePhoneInterface, MP3Interface {

    public void sendCall() {
        System.out.println("따르릉따르릉~~");
    }

    public void receiveCall() {
        System.out.println("전화가 왔어요.");
    }

    public void sendSMS() {
        System.out.println("문자가 나갑니다.");
    }

    public void receiveSMS() {
        System.out.println("문자가 왔어요.");
    }

    public void play() {
        System.out.println("음악을 연주합니다.");
    }

    public void stop() {
        System.out.println("음악이 중단됩니다.");
    }

    public void schedule() {
        System.out.println("일정 관리합니다.");
    }
}

public class Hello2025 {
    public static void main(String[] args) {
        SmartPhone phone = new SmartPhone();

        phone.printLogo();             
        phone.sendCall();              
        phone.play();                  
        System.out.println("3과 5를 더하면 " + phone.calculate(3, 5)); 
        phone.schedule();               
    }
}

