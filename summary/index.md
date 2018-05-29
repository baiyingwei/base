     1.以下代码的输出结果？
        for (var i = 0; i < 5; i++){
          setTimeout(function(){
            console.log(i); //5个5
          }, 1000)
        }
        console.log(i); //5


    2.替greeting字符串实现一个render(Object)方法，将特定字符串替换为Object中对应的属性。例如：
    var greeting = 'My name is ${name}, age${age}, I am a ${job.jobName}';
    var employee = {
        name: 'xiaoming',
        age: 11,
        job:{
            jobName: 'designer',
            jobLevel: 'senior'
        }
    }
    var result = greeting.render(employee);
    console.log(result);
    实现输出 My name is xiaoming, age11, I am a designer;

    var employee = {
      name: 'xiaoming',
      age: 11,
      job:{
        jobName: 'designer',
        jobLevel: 'senior'
      }
    }
    var greeting = 'My name is ${name}, age${age}, I am a ${job.jobName}';

    //方案一
    String.prototype.render = function(obj) {
      eval(`var {${Object.keys(obj).join(',')}} = obj`)
      return eval('`' + this + '`')
    }
    //方案二
    String.prototype.render = function(obj) {
      return eval('`' + this + '`')
    }
    var result = greeting.render(employee);

    console.log(result)


    3.var a = false;
      var b = new Boolean();

      console.log(a.valueOf() === a) //true false === fale
      console.log(b.valueOf() === b) //false true !== object

    4.(function(){
        setTimeout(function(){console.log(1),0});

        new Promise(function(){
          console.log(2)
          for(var i=0;i<10000;i++){
            if(i<=9999){
              console.log(4)
            }
          }
          console.log(3)
        })

        console.log(5)
      })();

      //输出 2 4（10000） 3 5 1

    5.var b=1;
      function a(b){
        console.log(b) //3
        var b = 2;
      }
      a(3)

    6.实现add(1,2,3...) add(1)(2)(3)(...)

    function add() {
      var count = 0;
      for (var i = 0; i<arguments.length;i++){
        count +=arguments[i];
      }
      return count;
    }

    console.log(add(1, 2, 3))


    function add(m) {
      var count = m;
      const addSum = function(n){
        count = count + n;
        return addSum;
      };
      addSum.getNum = function(){
        return count;
      }
      return addSum;

    }

    console.log(add(1)(2)(3).getNum())

    7.实现 ['a',['b','c'],'d'] "[1,[2,3],4]"  => {a:1,b:2,c:3,d:4}
    const a = ([a, [b, c], d]) => {
      return {a, b, c, d}
    }

    console.log(a([1, [2, 3], 4]))


    8.es6 set map obj 区别
    set  类似于数组， 成员值唯一
    map Map类似于对象，也是键值对结合，但是键的范围不限于字符串
    obj 对象，key是字符串

    9.描述网站网址流程
    DNS解析 -》 建立TCP连接 -》发送HTTP请求 -》响应请求 -》浏览器解析加载页面

    参考：https://juejin.im/post/5a50320c6fb9a01cb912b64a
    https://mp.weixin.qq.com/s/qMsf4DcMhn2cf0fXC-PLVA

    10.数组去重实现方法
    const arr = [1, 2, 3, 4, 4, 5, 6, 6];
    //第一种
    console.log([...new Set(arr)]);
    //第二种
    console.log(Array.from(new Set(arr)))
    //第三种
    const newArr = arr.filter((k, index) => {
      return arr.indexOf(k) === index
    })
    console.log(newArr)

    //第四种
    const obj = Object.create(null);
    for(var i = 0; i<arr.length;i++){
      obj[arr[i]] = 1;
    }

    console.log(Object.keys(obj));


    11.fetch 与xhttprequest区别
    webAPI
    请求：
    method，headers 都拥有发送参数和请求头
    body fetch 接口可以接收 Blob，ArrayBuffer，FormData，String 等多种形式的参数，xhttprequest接受的参数依赖于浏览器
    credentials fetch(include,omit,same-origin)
    mode 设置请求方式的标志位,fetch 可以通过设置这个标志位从发起请求阶段就阻止跨域请求。而 XMLHttpRequest 并没有对应的标志位，只能先发出请求然后通过检测 response 头中是否有允许跨域的字段来判断是否要阻止接收 response。
    redirect 设置请求如果遇到重定向的返回如何响应
    fetch API 提供了对请求更精确的控制。对 cookie，对跨域等功能都有了传统 Ajax（XMLHttpRequest）没有的功能，响应（response）还提供了一些的原来没有的标志位。
    12.如何获取服务器时间

    response header里获取 ， eg.fetch new Date(response.headers._headers.date)

    13.性能优化 dns预解析 压缩 按需加载 首屏加载

    性能优化：https://www.zhihu.com/question/21658448
    dns预解析： DNS Prefetching 是让具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能 减少用户的等待时间，提升用户体验 。

    按需加载：https://www.cnblogs.com/mamimi/p/7646358.html

    14.排序算法

    http://www.cnblogs.com/onepixel/articles/7674659.html

    冒泡排序

    核心思路：每当两相邻的数比较后发现它们的排序与排序要求相反时，就将它们互换。

    function bubbleSort(arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                    var temp = arr[j+1];        // 元素交换
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    }

    选择排序

    核心思路：在未排序序列中找到最大（小）元素，放在排序起始位置，继续查找，放在已排序末尾位置

    function selectionSort(arr) {
        var len = arr.length;
        var minIndex, temp;
        for (var i = 0; i < len - 1; i++) {
            minIndex = i;
            for (var j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                    minIndex = j;                 // 将最小数的索引保存
                }
            }
            temp = arr[i]; // 交换
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
        return arr;
    }

    插入排序

    它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

    function insertionSort(arr) {
        var len = arr.length;
        var preIndex, current;
        for (var i = 1; i < len; i++) {
            preIndex = i - 1;
            current = arr[i];
            while (preIndex >= 0 && arr[preIndex] > current) {
                arr[preIndex + 1] = arr[preIndex]; // 移位，为后续的插入预留位置
                preIndex--;
            }
            arr[preIndex + 1] = current;
        }
        return arr;
    }

    15.事件委托

    事件委托就是利用冒泡的原理，把事件的监听加到父级元素元素上，触发执行效果。

    var btn = document.getElementById("btn");
    document.onclick = function(event){
      event = event || window.event;
      var target = event.target || event.srcElement;
      if(target === btn){
        alert(btn.value);
        ...
      }
    }

    为什么选用事件委托：

    事件委托可以显著的提高事件的处理速度，减少内存的占用

    动态的添加 DOM 元素，不需要因为元素的改动而修改事件绑定。

    16.this指向
    超时调用的代码都是在全局作用域中执行的，因此函数中this的值在非严格模式下指向window对象，在严格模式下是undefined”。也就是说在非严格模式下，setTimeout中所执行函数中的this，永远指向window

    在使用=>定义函数的时候，this的指向是定义时所在的对象，而不是使用时所在的对象；

    class Animal {
      constructor() {
        this.type = "animal";
      }
      say(val) {
        setTimeout(function () {
          console.log(this); //window
          console.log(this.type + " says " + val);
        }, 1000)
      }
    }
    var animal = new Animal();
    animal.say("hi"); //undefined says hi

    class Animal {
      constructor() {
        this.type = "animal";
      }
      say(val) {
        setTimeout(() => {
          console.log(this); //Animal
          console.log(this.type + ' says ' + val);
        }, 1000)
      }
    }
    var animal = new Animal();
    animal.say("hi"); //animal says hi