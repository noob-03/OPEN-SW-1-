import java.util.Arrays;
import java.util.Random;
import java.util.Scanner;

abstract class Player {
    protected Player(String name) { this.name = name; }
    protected String[] bets = {"묵", "찌", "빠"};
    protected String name;
    protected String myBet;
    abstract public String next();
}

class Human extends Player {
    private Scanner scanner = new Scanner(System.in);

    public Human(String name) {
        super(name);
        this.name = name;
    }

    @Override
    public String next() {
        System.out.print(name + ">>");
        String nextBet = scanner.next();
        while(!Arrays.asList(bets).contains(nextBet)) {
            System.out.print("다시 입력해주세요>>");
            nextBet = scanner.next();
        }
        return nextBet;
    }
}

class Computer extends Player {
//    String[] bets = {"묵", "찌", "빠"};
    public Computer (String name) {
        super(name);
        this.name = name;
    }

    @Override
    public String next() {
        Random rand = new Random();
        String comBet = bets[rand.nextInt(bets.length)];
        System.out.println("결정하였습니다.");
        return comBet;
    }
}

class Game {
    private Player [] players = new Player[2];
    private Scanner scanner = new Scanner(System.in);
    public Game() {}
    private void createPlayer() {
        System.out.print("선수이름 입력>>");
        players[0] = new Human(scanner.next());
        System.out.print("컴퓨터이름 입력>>");
        players[1] = new Computer(scanner.next());
        System.out.println("2명의 선수를 생성 완료했습니다...");
    }
    public void run() {
        createPlayer();
        int Owner = 0;
        String OwnerBet = "";
        String OtherBet = "";
        while (true) {
            if(Owner == 0) {
                OwnerBet = players[0].next();
                OtherBet = players[1].next();
                System.out.println(players[0].name + " : " + OwnerBet + ", " + players[1].name + " : " + OtherBet);
            }
            if(Owner == 1) {
                OwnerBet = players[1].next();
                OtherBet = players[0].next();
                System.out.println(players[1].name + " : " + OwnerBet + ", " + players[0].name + " : " + OtherBet);
            }

            if(OwnerBet.equals(OtherBet)) {
                if(Owner == 0) {
                    System.out.println(players[0].name + "이 이겼습니다.");
                    break;
                }
                else if(Owner == 1) {
                    System.out.println(players[1].name + "이 이겼습니다.");
                    break;
                }
            }
            else {
                int whoWon = -1;
                if(OwnerBet.equals("묵") && OtherBet.equals("찌")) {
                    whoWon = 0;
                }
                else if(OwnerBet.equals("묵") && OtherBet.equals("빠")) {
                    whoWon = 1;
                }
                else if(OwnerBet.equals("찌") && OtherBet.equals("빠")) {
                    whoWon = 0;
                }
                else if(OwnerBet.equals("찌") && OtherBet.equals("묵")) {
                    whoWon = 1;
                }
                else if(OwnerBet.equals("빠") && OtherBet.equals("묵")) {
                    whoWon = 0;
                }
                else if(OwnerBet.equals("빠") && OtherBet.equals("찌")) {
                    whoWon = 1;
                }

                if(Owner == 0 && whoWon == 1) {
                    Owner = 1;
                    System.out.println("오너가 " + players[1].name + "로 변경되었습니다.");
                }
                else if(Owner == 1 && whoWon == 1) {
                    Owner = 0;
                    System.out.println("오너가 " + players[0].name + "로 변경되었습니다.");
                }
            }
        }
    }
}

public class MGPApp {
    public static void main(String[] args) {
        new Game().run();
    }
}
