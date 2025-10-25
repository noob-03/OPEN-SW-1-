import java.util.*;
import java.io.*;
public class HangManGameApp{
    private String answerWord;
    private StringBuilder BlankWord;
    private Words words;
    private int life = 5;
    private Scanner scanner;
    // 게임을시작하는메소드
    public void run() {
        System.out.println("지금부터 행맨 게임을 시작합니다.");
        words = new Words("words.txt");
        scanner = new Scanner(System.in);
        go();
        scanner.close();
    }
    // 선택된단어newWord에2 개의글자를숨긴단어hiddenWord를만든다.
    private void makeHidden() {
        answerWord = words.getRandomWord();
        if(answerWord == null){
            System.out.println("단어 목록이 비어있어 게임을 시작할 수 없습니다.");
            return;
        }
        BlankWord = new StringBuilder(answerWord);
        int tempnum = -1;
        int hidecount = 0;
        while(hidecount < 2){
            int randomBlank = (int)(Math.random()*answerWord.length());
            if(randomBlank != tempnum) {
                BlankWord.setCharAt(randomBlank, '-');
                tempnum = randomBlank;
                hidecount++;
            }
        }
    }
    // 사용자키를입력받으면서행맨게임을진행한다. 5 번틀리면종료하며, 한단어진행후y/n 물음에대해n를입력하면종료한다.
    private void go() {
        while(true){
            makeHidden();
            life = 5;
            String next = "n";
            while(life > 0){
                System.out.println(BlankWord);
                System.out.print(">>");
                String input = scanner.next().toLowerCase();
                char key = input.charAt(0);
                if(!complete(key)){
                    life--;
                }
                if(BlankWord.toString().equals(answerWord)){
                    System.out.println(answerWord);
                    System.out.print("Next(y/n)?");
                    next = scanner.next().toLowerCase();
                    break;
                }
            }
            if(!BlankWord.toString().equals(answerWord)){
                System.out.println("5번 실패 하였습니다.");
                System.out.println(answerWord);
                System.out.print("Next(y/n)?");
                next = scanner.next().toLowerCase();
            }
            if(next.equals("n"))
                break;
        }
    }
    // 사용자가입력한문자key가숨긴글자와일치하는지검사하고일치하면true를리턴하고, hiddenWord의'-'문자를key 문자로변경한다.
    private boolean complete(char key) {
        boolean match = false;
        for(int i = 0 ; i < BlankWord.length() ; i++){
            if(BlankWord.charAt(i) == '-'){
                if(answerWord.charAt(i) == key){
                    match = true;
                    BlankWord.setCharAt(i,key);
                }
            }
        }
        return match;
    }
    public static void main(String[] args) {
        HangManGameApp game = new HangManGameApp();
        game.run();
    }
}
// words.txt 파일을읽고벡터에저장하고벡터로부터랜덤하게단어를추출하는클래스
class Words {
    private Vector<String> wordVector = new Vector<String>();
    public Words(String fileName) {
        wordVector = new Vector<String>();
        try(Scanner filescanner = new Scanner(new FileReader(fileName))){
            while(filescanner.hasNext()){
                String word = filescanner.nextLine();
                wordVector.add(word.trim());
            }
        }catch(FileNotFoundException e){
            System.out.println("오류" + fileName + " 파일을 찾을 수 없습니다.");
            System.exit(1);
        }catch(IOException e){
            System.out.println("파일 입출력 오류: " + e.getMessage());
            System.exit(1);
        }
    }
    public String getRandomWord() {
        if(wordVector.isEmpty()){
            return null;
        }
        int index = (int)(Math.random()*wordVector.size());
        return wordVector.get(index);
    }
}
