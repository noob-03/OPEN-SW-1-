package yoon_young_chan;

import java.util.Scanner;
import java.util.Random;


abstract class Player {
    protected String name;
    protected String bet; 
    protected String lastBet = null;
    protected String[] bets = {"묵", "찌", "빠"};

    public Player(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getBet() {
        return lastBet;
    }

    public abstract String next();
}

class Human extends Player {
    private Scanner sc = new Scanner(System.in);

    public Human(String name) {
        super(name);
    }

    public String next() {
        System.out.print(name + " >> (묵/찌/빠 중 하나 입력): ");
        String input = sc.next();
        while (!(input.equals("묵") || input.equals("찌") || input.equals("빠"))) {
            System.out.print("잘못 입력했습니다. 다시 입력하세요: ");
            input = sc.next();
        }
        lastBet = input;
        return lastBet;
    }
}

class Computer extends Player {
    private Random rand = new Random();

    public Computer(String name) {
        super(name);
    }

    public String next() {
        int r = rand.nextInt(3);
        lastBet = bets[r];
        System.out.println(name + " >> " + lastBet);
        return lastBet;
    }
}

class Game {
    private Player human;
    private Player computer;
    private Player owner; 
    private Scanner sc = new Scanner(System.in);

    public Game() {
        System.out.print("당신의 이름을 입력하세요: ");
        String name = sc.next();
        human = new Human(name);
        computer = new Computer("컴퓨터");

        System.out.println("누가 먼저 시작하시겠습니까?");
        System.out.print("1. 사람 먼저  2. 컴퓨터 먼저 ▶ ");
        int choice = sc.nextInt();
        if (choice == 1) {
            owner = human;
        } else {
            owner = computer;
        }
        System.out.println(owner.getName() + "이(가) 먼저 시작합니다!\n");
    }

    public void run() {
        while (true) {
            String humanBet = human.next();
            String compBet = computer.next();

            if (humanBet.equals(compBet)) {
                System.out.println("같습니다!");
                if (owner == human) {
                    System.out.println(human.getName() + " 승리!! 🎉");
                } else {
                    System.out.println("컴퓨터 승리!! 💻");
                }
                break;
            }

            if (isHumanWin(humanBet, compBet)) {
                owner = human;
                System.out.println("사람이 이겼습니다. (현재 주도권: " + owner.getName() + ")");
            } else {
                owner = computer;
                System.out.println("컴퓨터가 이겼습니다. (현재 주도권: " + owner.getName() + ")");
            }

            System.out.println("-----------------------------");
        }
    }

    private boolean isHumanWin(String h, String c) {
        return (h.equals("묵") && c.equals("찌")) ||
               (h.equals("찌") && c.equals("빠")) ||
               (h.equals("빠") && c.equals("묵"));
    }
}

public class Hello2025 {
    public static void main(String[] args) {
        Game game = new Game();
        game.run();
    }
}

