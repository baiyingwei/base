// function Person(name) {
//   this.name = name;
// }
// Person.prototype.getName = function () {
//   console.log(this.name);
// }
// const p = new Person('123');
// p.getName()
// // console.log(Person)
// // console.log(p)
// // console.log(Object.getPrototypeOf(Person.prototype))

// function Foo() {
//   return 'foo';
// }
// Foo.prototype.method = function () {
//   return 'method';
// }
// function Bar() {
//   return 'bar';
// }
// Bar.prototype = Foo; // Bar.prototype 指向到函数
// let bar = new Bar();
// // console.dir(bar);

// // console.log(Bar.__proto__.__proto__ === Object.prototype);


// function instance_of(a, b) {
//   var O = b.prototype;// 取 R 的显示原型
//   L = a.__proto__;// 取 L 的隐式原型
//   while (true) {
//     if (L === null)
//       return false;
//     if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true 
//       return true;
//     L = L.__proto__;
//   }
// }

// // console.log(instance_of(bar, Function))

// // 木易杨
// function Animal() {
//   this.value = 'animal';
// }

// Animal.prototype.run = function () {
//   return this.value + ' is runing';
// }

// function Cat() { }

// // // 这里是关键，创建 Animal 的实例，并将该实例赋值给 Cat.prototype
// // // 相当于 Cat.prototype.__proto__ = Animal.prototype
// Cat.prototype = new Animal();
// Cat.prototype.constructor = Cat;
// const cat = new Cat();
// // cat.__proto__ = Animal.prototype;
// // console.log(Cat.prototype.constructor)

// // var instance = new Cat();
// // instance.value = 'cat'; // 创建 instance 的自身属性 value
// // console.log(instance.run()); // cat is runing

// // console.log(Object.prototype.toString.call(null).toString())

// function Students(name, num) {
//   this.name = name;
//   this.num = num;
// }

// Students.prototype.getNum = function () {
//   console.log(this.num);
// }

// function Teacher() {
//   this.teach = 'teach';
// }

// function FirstStudents(leval) {
//   this.leval = leval;
//   Students.call(this, '1,2', 12);
//   Teacher.call(this)
// }

// // FirstStudents.prototype = new Students();
// // FirstStudents.prototype.constructor = FirstStudents;

// // FirstStudents.prototype = Students.prototype;

// FirstStudents.prototype = Object.create(Students.prototype);
// FirstStudents.prototype.constructor = FirstStudents;


// const vbs = new FirstStudents(1);
// vbs.getNum()
// console.log(FirstStudents.prototype.constructor, Students.prototype.constructor)


class Person {
  //调用类的构造方法
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  //定义一般的方法
  showName() {
    console.log("调用父类的方法")
    console.log(this.name, this.age);
  }
}
let p1 = new Person('kobe', 39)
console.log(p1)
//定义一个子类
class Student extends Person {
  constructor(name, age, salary) {
    super(name, age)//通过super调用父类的构造方法
    this.salary = salary
  }
  // showName() {//在子类自身定义方法
  //   console.log("调用子类的方法")
  //   console.log(this.name, this.age, this.salary);
  // }
}
let s1 = new Student('wade', 38, 1000000000)
console.log(s1)
s1.showName()


