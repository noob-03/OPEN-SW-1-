package Sample;
import java.util.Random;
import java.util.Scanner;

	public class Practice10 {

		static abstract class Player {
		    protected String[] bet = {"묵", "찌", "빠"};
		    protected String name;
		    protected String lastBet = null;

		    protected Player(String name) { this.name = name; }
		    public String getName() { return name; }
		    public String getBet() { return lastBet; }

		    public abstract String next();
		}

		static class Human extends Player {
		    private Scanner scanner = new Scanner(System.in);

		    public Human(String name) { super(name); }

		    @Override
		    public String next() {
		        while (true) {
		            System.out.print(name + ">>");
		            String input = scanner.nextLine().trim();
		            for (String s : bet) {
		                if (s.equals(input)) {
		                    lastBet = s;
		                    return s;
		                }
		            }
		            System.out.println("잘못 입력하였습니다. 다시 입력하세요.");
		        }
		    }
		}

		static class Computer extends Player {
		    private Random random = new Random();

		    public Computer(String name) { super(name); }

		    @Override
		    public String next() {
		        lastBet = bet[random.nextInt(3)];
		        System.out.println("컴퓨터>> 결정하였습니다.");
		        return lastBet;
		    }
		}

		static class Game {
		    private Player[] players = new Player[2];
		    private Player owner;
		    private Scanner scanner = new Scanner(System.in);

		    public void run() {
		        System.out.println("***** 묵찌빠 게임을 시작합니다. *****");
		        System.out.print("선수이름을 입력>>");
		        String name = scanner.nextLine();
		        players[0] = new Human(name);
		        System.out.print("컴퓨터이름을 입력>>");
		        String cname = scanner.nextLine();
		        players[1] = new Computer(cname);
		        System.out.println("2명의 선수를 생성 완료하였습니다...\n");

		        owner = players[0];

		        while (true) {
		            String humanBet = players[0].next();
		            String computerBet = players[1].next();
		            System.out.println(players[0].getName() + " : " + humanBet + ", " + players[1].getName() + " : " + computerBet + "\n");

		            if (owner == players[0]) {
		                int result = compare(humanBet, computerBet);
		                if (result == 0) {
		                    System.out.println(players[0].getName() + "이 이겼습니다.");
		                    System.out.println("게임을 종료합니다...");
		                    break;
		                } else if (result < 0) {
		                    owner = players[1];
		                    System.out.println("오너가 " + owner.getName() + "로 변경되었습니다.\n");
		                }
		            } else {
		                int result = compare(computerBet, humanBet);
		                if (result == 0) {
		                    System.out.println(players[1].getName() + "이 이겼습니다.");
		                    System.out.println("게임을 종료합니다...");
		                    break;
		                } else if (result < 0) {
		                    owner = players[0];
		                    System.out.println("오너가 " + owner.getName() + "로 변경되었습니다.\n");
		                }
		            }
		        }
		    }

		    private int compare(String a, String b) {
		        if (a.equals(b)) return 0;
		        if ((a.equals("묵") && b.equals("찌")) ||
		            (a.equals("찌") && b.equals("빠")) ||
		            (a.equals("빠") && b.equals("묵"))) return 1;
		        return -1;
		    }
		}

		public class MGPApp {
		    public static void main(String[] args) {
		        new Game().run();
		    }
		}

}