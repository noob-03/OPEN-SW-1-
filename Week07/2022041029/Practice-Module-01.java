class Point {
    private int x, y;
    public Point(int x, int y) {
        this.x= x;
        this.y= y;
    }
}
public class ObjectPropertyEx{
    public static void print(Object obj) {
        System.out.println(obj.getClass().getName()); // 클래스이름
        System.out.println(obj.hashCode()); // 해시코드값
        System.out.println(obj.toString()); // 객체를문자열로만들어출력
        System.out.println(obj); // 객체출력
    }
    public static void main(String [] args) {
        Point p = new Point(2,3);
        print(p);
    }
}
