interface PhoneInterface {
    final int TIMEOUT = 10000;
    void sendCall();
    void receiveCall();
    default void printLogo() {
        System.out.println("**Phone**");
    }
}

class SaumsungPhone implements PhoneInterface {
    @Override
    public void sendCall() {
        System.out.println("띠리리리링");
    }
    @Override
    public void receiveCall() {
        System.out.println("전화가 왔습니다.");
    }
    public void flash() {System.out.println("전화기에 불이 켜졌습니다.");}
}

public class Practice08 {
    public static void main(String[] args) {
        SaumsungPhone phone = new SaumsungPhone();
        phone.printLogo();
        phone.sendCall();
        phone.receiveCall();
        phone.flash();
    }
}
