class Person {
    private int weight;
    int age;
    protected int height;
    public String name;
    public void setWeight(int weight) {
        this.weight= weight;
    }
    public int getWeight() {
        return weight;
    }
}
class Student extends Person {
    public void set() {
        age = 30; // 슈퍼클래스의디폴트멤버접근가능
        name = "홍길동"; // 슈퍼클래스의public 멤버접근가능
        height = 175; // 슈퍼클래스의protected 멤버접근가능
        // weight = 99; // 오류. 슈퍼클래스의private 접근불가
        setWeight(99); // private 멤버weight은setWeight()으로간접접근
    }
}
public class InheritanceEx{
    public static void main(String[] args) {
        Student s = new Student();
        s.set();
    }
}
