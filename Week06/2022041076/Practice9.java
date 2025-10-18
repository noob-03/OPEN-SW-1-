package Sample;

import java.util.Scanner;

public class Practice9{
	static interface PhoneInterface9{ 
	    final int TIMEOUT = 10000; 
	    void sendCall(); 
	    void receiveCall(); 
	    default void printLogo() { 
	        System.out.println("** Phone **");
	    }
	}
	static interface MobilePhoneInterface extends PhoneInterface9{
	    void sendSMS();
	    void receiveSMS();
	}
	interface MP3Interface { 
	    public void play();
	    public void stop();
	}
	static class PDA { 
	    public int calculate(int x, int y) {
	        return x + y;
	    }
	}
	
	static class SmartPhone extends PDA implements
	        MobilePhoneInterface, MP3Interface {
	    
	    @Override
	    public void sendCall() {
	        System.out.println("따르릉따르릉~~");
	    }
	    @Override
	    public void receiveCall() {
	        System.out.println("전화왔어요.");
	    }
	    @Override
	    public void sendSMS() {
	        System.out.println("문자갑니다.");
	    }
	    @Override
	    public void receiveSMS() {
	        System.out.println("문자왔어요.");
	    }
	    
	    @Override
	    public void play() {
	        System.out.println("음악연주합니다.");
	    }
	    @Override
	    public void stop() {
	        System.out.println("음악중단합니다.");
	    }
	    
	    public void schedule() {
	        System.out.println("일정관리합니다.");
	    }
	}
	public class InterfaceEx9{
	    public static void main(String[] args) {
	        SmartPhone phone = new SmartPhone();
	        phone.printLogo();
	        phone.sendCall();
	        phone.play();
	        System.out.println("3과 5 SmartPhone를 더하면"+ phone.calculate(3,5));
	        phone.schedule();
	    }
	}
}