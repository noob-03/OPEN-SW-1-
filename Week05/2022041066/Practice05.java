//  실습4 에서 작성한 Book 클래스의 생성자를 this()를 이용하여 수정하시오
public class Book_1 {
    // 필드 (멤버 변수) 선언
    String title;
    String author;

    // 메소드: 책의 제목과 저자를 출력하는 기능
    void show() {
        System.out.println(title + " " + author);
    }

    // 생성자 1: 기본 생성자
    public Book_1() {
        // this()는 같은 클래스의 다른 생성자를 호출하는 문법입니다.
        // 아래 코드는 생성자 3 (Book_1(String, String))을 호출합니다.
        this("", ""); 
        System.out.println("생성자 호출됨");
    }

    // 생성자 2: 제목만 받는 생성자
    public Book_1(String title) {
        // 생성자 3을 호출하여 저자는 "작자미상"으로 자동 설정합니다.
        this(title, "작자미상");
    }

    // 생성자 3: 제목과 저자를 모두 받는 생성자
    public Book_1(String title, String author) {
        // 'this.필드명'은 객체 자신의 필드를 가리킵니다.
        // 매개변수 이름과 필드 이름이 같을 때 구분하기 위해 사용합니다.
        this.title = title;
        this.author = author;
    }

    // 프로그램의 시작점, main 메소드
    public static void main(String[] args) {
        // 1. 생성자 3을 호출하여 Book_1 객체 생성
        Book_1 littlePrince = new Book_1("어린왕자", "생텍쥐페리");

        // 2. 생성자 2를 호출하여 Book_1 객체 생성
        Book_1 loveStory = new Book_1("춘향전");

        // 3. 생성자 1을 호출하여 Book_1 객체 생성
        Book_1 emptyBook = new Book_1();

        // loveStory 객체의 show() 메소드를 호출하여 정보를 출력
        loveStory.show();
    }
}
/*
생성자 호출됨
춘향전 작자미상 
*/
