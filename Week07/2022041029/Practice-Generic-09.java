import java.util.InputMismatchException;
import java.util.Scanner;
import java.util.Vector;
class Word { // 영어단어와그에해당하는한글뜻을저장하는클래스
    private String Korean;
    private String English;
    Word(String english, String korean){
        this.English = english;
        this.Korean = korean;
    }
    public String getKorean(){
        return Korean;
    }
    public String getEnglish(){
        return English;
    }
}
public class WordQuiz{ // 퀴즈의이름과단어목록(Vector)을관리하며, 퀴즈를실행
    private String name;
    private Vector<Word> v;
    Scanner scanner = new Scanner(System.in);

    public WordQuiz(String name) {
        this.name = name;
        v = new Vector<Word>();
        v.add(new Word("love", "사랑"));
        v.add(new Word("animal", "동물"));
        v.add(new Word("emotion", "감정"));
        v.add(new Word("human", "인간"));
        v.add(new Word("stock", "주식"));
        v.add(new Word("trade", "거래"));
        v.add(new Word("society", "사회"));
        v.add(new Word("baby", "아기"));
        v.add(new Word("honey", "꿀"));
        v.add(new Word("dall", "인형"));
        v.add(new Word("bear", "곰"));
        v.add(new Word("picture", "사진"));
        v.add(new Word("painting", "그림"));
        v.add(new Word("fault", "오류"));
        v.add(new Word("example", "보기"));
        v.add(new Word("eye", "눈"));
        v.add(new Word("statue", "조각상"));
    }

    private int makeExample(int ex[], int answerIndex) { // 4개의보기인덱스를생성하고, 그중한위치에정답인덱스를심는메소드
        int correctIndex = (int)(Math.random()*4);
        ex[correctIndex] = answerIndex;
        for(int i = 0 ; i < 4 ; i++){
            if( i == correctIndex)
                continue;
            int wrongIndex;
            do{
                wrongIndex = (int)(Math.random()*v.size());
            }while(wrongIndex == answerIndex || exists(ex,wrongIndex));
            ex[i] = wrongIndex;
        }
        return correctIndex + 1;
    }
    private boolean exists(int n[], int index) { // 배열에특정index가존재하는지확인하는메소드
        for(int i = 0 ; i < n.length ; i++){
            if(n[i] == index)
                return true;
        }
        return false;
    }
    public void run() { // 퀴즈실행메소드. 사용자와상호작용하며문제를출제하고정답을확인.
        System.out.println("\"" + this.name + "\"의 단어 테스트를 시작합니다. -1을 입력하면 종료합니다.");
        System.out.println("현재 " + v.size() + "개의 단어가 들어 있습니다.");
        while(true) {
            int answerIndex = (int) (Math.random() * v.size());
            Word answerWord = v.get(answerIndex);   //정답단어 객체 생성
            String question = answerWord.getEnglish();

            int[] option = new int[4];
            int correctOption = makeExample(option, answerIndex);
            System.out.println(question + "?");
            for (int i = 0; i < 4; i++) {
                String optionName = v.get(option[i]).getKorean();
                System.out.print("(" + (i + 1) + ")" + optionName + "  ");
            }

            int userChoice;
            while(true) {
                try {
                    System.out.print(":>");
                    userChoice = scanner.nextInt();
                    break;
                } catch (InputMismatchException e) {
                    System.out.println("숫자(1~4)를 입력해야 합니다. 다시 시도하세요.");
                    scanner.next();
                }
            }
            if (userChoice == -1) {
                System.out.println("\"" + this.name + "\"" + "를 종료합니다.");
                break;
            } else if (userChoice == correctOption)
                System.out.println("Excellent !!");
            else
                System.out.println("No !!");

        }
        scanner.close();
    }
    public static void main(String[] args) { // 프로그램의시작점. WordQuiz객체생성후실행
        WordQuiz game = new WordQuiz("명품영어");
        game.run();
    }
}
