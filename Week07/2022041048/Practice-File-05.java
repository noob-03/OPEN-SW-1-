package yoon_young_chan;

import java.io.*;
public class Hello2025{
	public static void main(String[] args) {
		byte b[] = {7,51,3,4,-1,24};
		try {
			FileOutputStream fout=
					new FileOutputStream("c:\\Temp\\test.out");
			for(int i=0; i<b.length; i++)
				fout.write(b[i]);
			fout.close();
		} 
		catch(IOException e) {
			System.out.println( "c:\\Temp\\test.out에저장할수없습니다. 경로명을확인해주세요");
			return;
		}
		System.out.println("c:\\Temp\\test.out을저장하였습니다.");
	}
}
