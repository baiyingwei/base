/**
 * 工厂模式
 * 1.把实现相同功能的代码进行封装，以此来实现批量生产
 * 2.低耦合，高内聚，减少页面冗余代码，提高复用率
 */
(function () {
  class Factory {
    constructor(username, pwd, role) {
      this.username = username;
      this.pwd = pwd;
      this.role = role;
    }
  }

  class CreateRoleFactory {
    static create(username, pwd, role) {
      return new Factory(username, pwd, role);
    }
  }


  const admin = CreateRoleFactory.create('张三', '222', 'admin');

  console.log(admin)
})();
/**
 * 单例模式
 * 1.表现形式 var obj={} 对象
 * 2.作用 把描述同一件事物的属性或特征进行分组归类，储存在同一个堆内存中，避免了全举变量的冲突和污染
 */

/**
 * 观察者模式（发布订阅）
 * 一对多，一个改变，通知所有
 */

(function () {
  class Center {
    constructor() {
      this.line = [];
    }
    add(a) {
      this.line.push(a);
    }
    publish(params) {
      this.line.map(item => item.getMsg(params))
    }
  }

  class Publish {
    constructor() {

    }
    publish(pubSub, params) {
      pubSub.publish(params);
    }
  }

  class Recive {
    constructor(name) {
      this.name = name;
    }
    getMsg(params) {
      console.log(this.name + '收到了消息' + params);
    }
  }

  const pub = new Publish();
  const xw = new Recive('小王');
  const xl = new Recive('小李');

  const center = new Center();

  center.add(xw);
  center.add(xl);

  pub.publish(center, '这是观察者模式啊');
})()
/**
* 代理模式
*/