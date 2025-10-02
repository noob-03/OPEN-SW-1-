/*
 char[] 배열을전달받아출력하는printCharArray() 메소드와배열속의
공백(‘ ’) 문자를‘,’로대치하는replaceSpace() 메소드를작성하시오.
 */

public class ArrayParameterEx {

    // char 배열을 매개변수로 받아, 배열의 공백(' ')을 쉼표(',')로 변경하는 메소드
    static void replaceSpace(char a[]) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == ' ') { // 만약 배열의 원소가 공백 문양이라면
                a[i] = ',';      // 해당 원소를 쉼표로 변경
            }
        }
    }

    // char 배열을 매개변수로 받아, 배열의 모든 원소를 화면에 출력하는 메소드
    static void printCharArray(char a[]) {
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i]); // 배열의 원소를 한 줄에 이어서 출력
        }
        System.out.println(); // 모든 원소를 출력한 후 줄을 바꿈
    }

    // 프로그램의 시작점, main 메소드
    public static void main(String args[]) {
        // char 배열 선언 및 초기화
        char c[] = {'T', 'h', 'i', 's', ' ', 'i', 's', ' ', 'a', ' ', 'p', 'e', 'n', 'c', 'i', 'l', '.'};

        // 1. 수정 전 배열 c를 출력
        printCharArray(c);

        // 2. replaceSpace 메소드를 호출하여 배열 c의 공백을 쉼표로 변경
        replaceSpace(c);

        // 3. 수정 후 배열 c를 다시 출력
        printCharArray(c);
    }
}
/* 출력값: 
This,is,a,pencil.
This is a pencil.
*/

