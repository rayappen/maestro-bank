package Generics;

class Test<T> {

    T obj;
    Test(T obj) {
        this.obj = obj;
    }

    public T getObject(){
        return this.obj;
    }

}

class TestM<T, U>{

    T obj1;
    U obj2;

    TestM(T obj1, U obj2) {
        this.obj1 = obj1;
        this.obj2 = obj2;
    }

    public T getTObject(){
        return this.obj1;
    }

    public U getUObject(){
        return this.obj2;
    }
}

public class GenericClass {

    public static void main(String[] args) {

        Test<Integer> test = new Test<>(50);
        System.out.println(test.getObject());

        TestM<String, Integer> testM = new TestM<>("Jacob", 1000);
        System.out.println("T: " + testM.getTObject());
        System.out.println("U: " + testM.getUObject());
    }

}
