// 제목,저자의미인 title과 author 필드를가진Book 클래스를작성하고,
// 생성자를작성하여필드를초기화하시오.

public class Book {
    // 필드 (멤버 변수) 선언
    String title;  // 책의 제목을 저장할 변수
    String author; // 책의 저자를 저장할 변수

    // 생성자 1: 제목만 매개변수로 받는 경우
    public Book(String t) {
        title = t;            // 매개변수 t로 제목(title)을 초기화
        author = "작자미상";   // 저자(author)는 "작자미상"으로 초기화
    }

    // 생성자 2: 제목과 저자를 모두 매개변수로 받는 경우
    public Book(String t, String a) {
        title = t;            // 매개변수 t로 제목(title)을 초기화
        author = a;           // 매개변수 a로 저자(author)를 초기화
    }

    // 프로그램의 시작점, main 메소드
    public static void main(String[] args) {
        // 1. 생성자 2를 호출하여 Book 객체 생성
        Book littlePrince = new Book("어린왕자", "생텍쥐페리");

        // 2. 생성자 1을 호출하여 Book 객체 생성
        Book loveStory = new Book("춘향전");

        // 생성된 객체의 제목과 저자를 출력
        System.out.println(littlePrince.title + " " + littlePrince.author);
        System.out.println(loveStory.title + " " + loveStory.author);
    }
}

/*
출력값:
어린왕자 생텍쥐페리
춘향전 작자미상  
 */
