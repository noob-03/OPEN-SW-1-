import java.util.Random;
import java.util.Scanner;
import java.util.Arrays;

abstract class Player {
    protected static String[] bet = {"묵", "찌", "빠"};
    protected String name; // 선수이름
    protected String lastBet = null; // 선수가최근에낸값

    protected Player(String name) { this.name = name; }
    public String getName() { return name; }
    public String getBet() { return lastBet; }
    abstract public String next(); // 선수가낸것으로묵찌빠중1개를결정하여리턴
}

// 사람선수를표현하는클래스. Player 클래스를상속받아next() 구현
class Human extends Player {
    private Scanner scanner= new Scanner(System.in);
    public Human(String name) {
        super(name);
    }
    // 추상메소드구현
    @Override
    public String next() {
        System.out.print(this.name + ">>");
        lastBet = scanner.next();
        while(!Arrays.asList(bet).contains(lastBet)){
            System.out.println("⚠️ 잘못된 입력입니다. '묵', '찌', '빠' 중에서만 선택해주세요.");
            System.out.print("다시 내세요: ");
            lastBet = scanner.next();
        }
        return lastBet;
    }
}
// 컴퓨터선수를표현하는클래스. Player 클래스를상속받아next() 구현
class Computer extends Player {
    public Computer(String name) {
        super(name);
    }
    // 추상메소드구현
    @Override
    public String next() { // bet에서랜덤하게한개선택하여리턴
        int randomIndex = new Random().nextInt(3);
        lastBet = bet[randomIndex];
        System.out.print(this.name + ">> 결정하였습니다.");
        return lastBet;
    }
}
class Game {
    private Player [] players = new Player[2]; // 두명의선수객체
    private Scanner scanner= new Scanner(System.in);
    public Game() { }
    private void createPlayer() { // 2명의선수객체생성
        System.out.print("선수이름 입력>>");
        players[0] = new Human(scanner.next());
        System.out.print("컴퓨터이름 입력>>");
        players[1] = new Computer(scanner.next());
        System.out.println("2명의 선수를 생성 완료하였습니다...");
    }
    public void run() {
        System.out.println("***** 묵찌빠 게임을 시작합니다. *****");
        createPlayer();
        String owner = players[0].getName();
        System.out.println();
        while(true) {
            Player ownerPlayer;
            Player challengerPlayer;
            if (owner.equals(players[0].getName())) {
                ownerPlayer = players[0];
                challengerPlayer = players[1];
            } else {
                ownerPlayer = players[1];
                challengerPlayer = players[0];
            }
            String ownerchoice = ownerPlayer.next();
            String challegerchoice = challengerPlayer.next();
            System.out.println(ownerPlayer.getName() + " : " + ownerchoice + ", " + challengerPlayer.getName() + " : " + challegerchoice);

            if(ownerchoice.equals(challegerchoice)){
                System.out.println(owner + "이 이겼습니다.");
                System.out.println("게임을 종료합니다...");
                break;
            }else{
                if(ownerchoice.equals("묵") && challegerchoice.equals("찌") || ownerchoice.equals("찌") && challegerchoice.equals("빠") || ownerchoice.equals("빠") && challegerchoice.equals("묵")) {

                }else{
                    owner = challengerPlayer.getName();
                    System.out.println("오너가 " + owner + "(으)로 변경되었습니다.");
                }
            }
        }
    }
}

public class MGPapp{
    public static void main(String[] args) {
        new Game().run();
    }
}
