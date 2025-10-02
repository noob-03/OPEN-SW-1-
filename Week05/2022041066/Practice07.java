import java.util.Scanner;

// Book 객체를 만들기 위한 설계도 (클래스)
class Book {
    String title, author; // 책 제목과 저자를 저장할 필드

    // 생성자: 객체가 생성될 때 제목과 저자를 초기화
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
}

// 메인 클래스 (프로그램 실행 시작점)
public class BookArray {
    public static void main(String[] args) {
        // Book 객체를 담을 수 있는 배열 book을 선언하고, 2개의 공간을 할당
        Book[] book = new Book[2];

        // 사용자 입력을 받기 위한 Scanner 객체 생성
        Scanner scanner = new Scanner(System.in);

        // for문을 사용하여 배열의 크기(2)만큼 반복
        for (int i = 0; i < book.length; i++) {
            System.out.print("제목>>");
            String title = scanner.nextLine(); // 사용자가 입력한 제목을 읽음

            System.out.print("저자>>");
            String author = scanner.nextLine(); // 사용자가 입력한 저자를 읽음

            // 입력받은 제목과 저자로 Book 객체를 생성하여 배열의 i번째 칸에 저장
            book[i] = new Book(title, author);
        }

        // for문을 사용하여 배열에 저장된 모든 Book 객체의 정보를 출력
        for (int i = 0; i < book.length; i++) {
            System.out.print("(" + book[i].title + ", " + book[i].author + ")");
        }

        // Scanner 사용이 끝났으므로 자원을 닫아줌
        scanner.close();
    }
}

