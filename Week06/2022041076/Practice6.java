package Sample;

import java.util.Scanner;

public class Practice6{
	static class Weapon {
	    protected int fire() {
	        return 1; //
	    }
	}
	static class Cannon extends Weapon {
		@Override
	    protected int fire() { 
	        return 10; 
	    }
	}
	static public class Overriding {
	    public static void main(String[] args) {
	        Weapon weapon;
	        weapon = new Weapon();
	        System.out.println("기본무기의살상능력은" + weapon.fire());
	        weapon = new Cannon();
	        System.out.println("대포의살상능력은" + weapon.fire());
	    }
	}
}