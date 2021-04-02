(function () {
  //默认绑定
  this.a = 2;
  function foo() {
    console.log(this.a);
  }
  foo();
  //隐式绑定
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2,
    foo: foo,
  }

  obj.foo(); // 2
  //显示绑定
  function foo() {
    console.log(this.a);
  }

  var obj = {
    a: 2
  };

  foo.call(obj);

  //显示绑定硬绑定
  function foo(something) {
    console.log(this.a, something);
    return this.a + something;
  }

  function bind(fn, obj) {
    return function () {
      return fn.apply(obj, arguments);
    };
  }

  var obj = {
    a: 2
  }

  var bar = bind(foo, obj);

  bar(3)

  //new 绑定
  function foo(a) {
    this.a = a;
  }

  var bar = new foo(7);
  console.log(bar.a)

  //call实现 参数this arguments
  Function.prototype.call2 = function (context = window, ...arg) {
    const fn = Symbol('fn');
    context[fn] = this;
    context.fn(...arg);
    delete context[fn];
  }
  //apply实现 参数this arguments
  Function.prototype.apply2 = function (context = window, arg) {
    context.fn = this;
    context.fn(...arg);
    delete context.fn;
  }
  //bind实现
  Function.prototype.bind2 = function (context) {
    const params = [...arguments].slice(1);
    const fn = this;
    const fn1 = function (...args) {
      fn.apply(context, [...params, ...args]);
    }
    fn1.prototype = fn.prototype;
    return fn1;
  }

  //object.create
  Object.prototype.create = function (context) {

  }

  //new 实现
  function new2() {
    const obj = new Object();
    const Con = [].shift.call(arguments);
    obj.__proto__ = Con.prototype;
    const result = Con.apply(obj, [...arguments]);
    return typeof result === 'object' ? result : obj;
  }

  var name = 'window'

  var person1 = {
    name: 'person1',
    show1: function () {
      console.log(this.name)
    },
    show2: () => console.log(this.name),
    show3: function () {
      return function () {
        console.log(this.name)
      }
    },
    show4: function () {
      return () => console.log(this.name)
    }
  }
  var person2 = { name: 'person2' }

  person1.show1()//person1
  person1.show1.call(person2)//person2

  person1.show2()//window
  person1.show2.call(person2)//window

  person1.show3()()//window
  person1.show3().call(person2)//person2
  person1.show3.call(person2)()//window

  person1.show4()()//person1
  person1.show4().call(person2)//person1
  person1.show4.call(person2)()//person2


  var name = 'window'

  function Person(name) {
    this.name = name;
    this.show1 = function () {
      console.log(this.name)
    }
    this.show2 = () => console.log(this.name)
    this.show3 = function () {
      return function () {
        console.log(this.name)
      }
    }
    this.show4 = function () {
      return () => console.log(this.name)
    }
  }

  var personA = new Person('personA')
  var personB = new Person('personB')

  personA.show1()//personA
  personA.show1.call(personB)//personB

  personA.show2()//personA
  personA.show2.call(personB)//personA

  personA.show3()()//window
  personA.show3().call(personB)//personB
  personA.show3.call(personB)()//window

  personA.show4()()//personA
  personA.show4().call(personB)//personA
  personA.show4.call(personB)()//personB


  var scope = "global scope";
  function checkscope() {
    var scope = "local scope";
    function f() {
      return scope;
    }
    return f;
  }

  checkscope();

})();
