/*
정수4개를 가지는 일차원배열을 생성하고 1,2,3,4 로초기화한다음, 배열을 리턴하는
makeArray()를 작성하고 이메소드로부터 배열을 전달받아 값을 출력하는 프로그램
*/

public class ReturnArray{
    
    static int[] makeArray() { // 정수형배열을리턴하는메소드
        int temp[] = new int[4]; // 배열생성
        for (int i=0; i<temp.length; i++)
            temp[i] = i + 1; // 배열의원소를1, 2, 3, 4로초기화
        return temp; // 배열리턴
    }
    public static void main (String[] args) {
        int intArray[]; // 배열레퍼런스변수선언
        intArray= makeArray(); // 메소드로부터배열전달받음
        for (int i=0; i<intArray.length; i++)
            System.out.print(intArray[i] + " "); // 배열모든원소출력
    }
}

//출력 결과: 1 2 3 4 
