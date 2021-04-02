javascript基础
  闭包(柯里化)
  执行上下文，作用域
  this(call, apply, bind)
  垃圾回收
  数据类型（隐式转换，显示转换），内存空间（堆栈队列）
  事件流（事件冒泡，事件捕获）

  深拷贝(lodash)，浅拷贝
  原型，原型链
  继承

  设计模式
  promise
  async/await
  
  本地存储cookie sessionstroage localstroage indexdb
  跨域 jsonp acress-control-allow-origin:* 代理 window.postmessage websocket

  浏览器渲染原理
  加载
    优化
      1.减少连接数合并请求
      2.缓存（cache from memory, disk）, localstorage
      3.tcp网络连接优化, http2, keep-alive
      4.资源大小 gzip, webp, image压缩，cookie体积
      5.硬件：加大带宽，cdn
      6.预加载：dns预解析，多个域名
  渲染



react
  react-router
  优化： 1.happypack 构建速度 60 - 10
  
        2.路由懒加载， 组件懒加载 Suspense 
        3.受控组件颗粒化，独立请求，不要影响父组件，不要定义没必要的state,跟页面展示无关的表单
        4.组件拆分细小组件
        5.合理使用react.usememo缓存事件函数变量组件
        6.少定义箭头函数，少使用闭包
        7.循环正确使用key
        8.避免重复渲染
        9.状态管理，不变的数据，多个页面公用的数据放到状态管理
        10.虚拟列表

        //hook使函数组件有状态
        函数组件没有实例，节约性能
        组件优化最重要的策略，减少组件的刷新 类组件——》pureComponent
                                          函数组件——》react.memo()


webpack
 1.打包工具选型 gulp webpack应用使用 rollup,类库使用 parcel 0配置
 2.如何调试webpack
 2.webpack构建流程


ajax实现原理
babel原理
setState原理,同步还是异步的
数组拷贝的方法
对象拷贝的方法
axios实现的方式
axios fetch和ajax区别
http和https区别
强缓存协商缓存
http状态码
项目优化，首屏加载问题
node中间层做了什么，如实现错误监听
react虚拟dom
数组去重
promise实现原理
promse.all promise.race区别
解决异步其他方案
webpack loader和plugin区别
微任务宏任务
同步任务异步任务
vue watch和computed干嘛的，区别
webpack plugin
px em rem是什么
路由懒加载
如何判断是不是数组

优化：
1.渲染无限滚动数据 卡顿，浏览器内存占用大 dom节点内存变大，监听事件内存变大
  虚拟列表，只渲染可视区域，dom元素复用 
  事件委托，事件委托到父级元素
上传大文件卡顿如何解决，loading无法加载
同一页面两张图片第二张从哪里去的，缓存，memory cache
渲染长列表卡顿如何解决，或者说用户有用到系统反馈页面卡顿，从哪里入手解决这个问题

自我介绍
项目亮点：难点
重构决策： 收益和成本
          保证新老系统平滑过渡，切换系统发生问题如何回滚

优雅的处理图片降级 onerror事件
  error捕获阶段可获取 备选图片失败无线重试，重试失败达到一定次数复制base64绝对安全的图片

对象的方法 Object.getOwnPropertyDescriptor(obj,属性) 获取装饰器属性
          Object.assign(a, b)拷贝对象，指针指向a
          Object.defineProperty(obj, '属性', ()=>{})
          obj.propertyIsEnumerable(属性) 获取对象是否可枚举
          
单例模式只实例化一次
  单例函数放在闭包里，自执行函数， new 实例构造函数保存，有值返值，没值创建实例
  单例函数挂在函数静态方法上
  单例使用class语法糖