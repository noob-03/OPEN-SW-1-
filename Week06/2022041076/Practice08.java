package Sample;

import java.util.Scanner;

public class Practice08{
	
	interface PhoneInterface{ 
	    final int TIMEOUT = 10000; 
	    void sendCall(); 
	    void receiveCall(); 
	    default void printLogo() { 
	        System.out.println("** Phone **");
	    }
	}
	static class SamsungPhone implements PhoneInterface{ 
	    
	    @Override
	    public void sendCall() {
	        System.out.println("띠리리리링");
	    }
	    @Override
	    public void receiveCall() {
	        System.out.println("전화가왔습니다.");
	    }
	    
	    public void flash() { System.out.println("전화기에불이켜졌습니다."); }
	}
	public class InterfaceEx{
	    public static void main(String[] args){
	        SamsungPhone phone = new SamsungPhone();
	        phone.printLogo();
	        phone.sendCall();
	        phone.receiveCall();
	        phone.flash();
	    }
	}

}
