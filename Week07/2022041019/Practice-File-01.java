package org.example;
import java.io.*;

public class FileReaderEx {
    public static void main(String[] args) {
        FileReader fin = null;
        try {
            fin = new FileReader("c:\\Windows\\system.in");
            int c;
            while((c = fin.read()) != -1) {
                System.out.print((char)c);
            }
        }
        catch (IOException e) {
            System.err.println("입출력 오류");
        }
    }
}
