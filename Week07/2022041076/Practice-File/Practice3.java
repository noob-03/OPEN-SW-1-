package Sample;

import java.io.*;

public class Practice3{
	
	public class FileReadHangulFail {
	    public static void main(String[] args) {
	        InputStreamReader in = null;
	        FileInputStream fin = null;
	        try {
	            fin = new FileInputStream("c:\\hangul.txt");
	            in = new InputStreamReader(fin, "US-ASCII");
	            int c;
	            System.out.println("인코딩문자집합은" + in.getEncoding());
	            while ((c = in.read()) != -1) {
	                System.out.print((char) c);
	            }
	            in.close();
	            fin.close();
	        } catch (IOException e) {
	            System.out.println("입출력오류");
	        }
	    }
	}
}