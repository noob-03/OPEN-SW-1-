class Shape {
    public Shape next;
    public Shape() {next = null;}
    public void draw() {
        System.out.println("Shape");
    }
}

class Line extends Shape {
    public void draw(){
        System.out.println("Line");
    }
}
class Rect extends Shape {
    public void draw() {
        System.out.println("Rect");
    }
}