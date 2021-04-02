const { keys } = require("lodash");

/**
 * 浅拷贝
 * 1.Object.assign()
 * 2.spread(...)运算符
 * 3.Array.prototype.slice()
 */
let a = {
  name: 1,
  child: {
    name: 2
  }
}
// let b = { ...a };
// let b = JSON.parse(JSON.stringify(a));
// b.age = 2;
// b.child.age = 3;

// console.log(b)
// console.log(a)
/**
 * 深拷贝
 * 1.JSON.parse(JSON.stringify(Object))
 *  问题：忽略undefined, symbol, 不能序列化函数, 不能解决循环引用的对象
 * 2.插件zepto
 * 3.插件lodash
 */

// function deepClone(data) {
//   let obj;
//   if (typeof data === 'array') {
//     obj = [];
//     data.map(k => {
//       obj.push(deepClone(k));
//     })
//   } else if (typeof data === 'object') {
//     obj = {};
//     for (let i in data) {
//       obj[i] = deepClone(data[i]);
//     }
//   } else {
//     return data;
//   }
//   return obj;
// }

// let b = deepClone(a);
// b.age = 2;
// b.child.age = 3;
// console.log(b)
// console.log(a)

// function $() {

// }

// function isPlainObject(data) {
//   return typeof data === 'object';
// }

// function isArray(arr) {
//   return typeof arr === 'array';
// }

// function extend(target, source, deep) {
//   for (key in source)
//     if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
//       // source[key] 是对象，而 target[key] 不是对象， 则 target[key] = {} 初始化一下，否则递归会出错的
//       if (isPlainObject(source[key]) && !isPlainObject(target[key]))
//         target[key] = {}

//       // source[key] 是数组，而 target[key] 不是数组，则 target[key] = [] 初始化一下，否则递归会出错的
//       if (isArray(source[key]) && !isArray(target[key]))
//         target[key] = []
//       // 执行递归
//       extend(target[key], source[key], deep)
//     }
//     // 不满足以上条件，说明 source[key] 是一般的值类型，直接赋值给 target 就是了
//     else if (source[key] !== undefined) target[key] = source[key]
// }

// // Copy all but undefined properties from one or more
// // objects to the `target` object.
// $.extend = function (target) {
//   var deep, args = Array.prototype.slice.call(arguments, 1);
//   console.log([...arguments].slice(1))

//   //第一个参数为boolean值时，表示是否深度合并
//   if (typeof target == 'boolean') {
//     deep = target;
//     //target取第二个参数
//     target = args.shift()
//   }
//   // 遍历后面的参数，都合并到target上
//   args.forEach(function (arg) { extend(target, arg, deep) })
//   return target
// }

// const b = $.extend(true, {}, a);
// b.age = 2;
// b.child.age = 3;
// console.log(b)
// console.log(a)

// const c = [1, 2, [3, 4]];
// const _ = require('lodash');
// const b = _.cloneDeep(c);
// b[2] = 2;
// console.log('b', b)
// console.log('c', c)

//loadsh深拷贝实现原理
//怎么实现this对象的深拷贝
function forEach(array, fn) {
  let index = -1;
  while (array.length > ++index) {
    fn(array[index], index);
  }
}

function deepClone(value, map = new Map()) {
  if (typeof value === 'object') {
    console.log('result', map)
    const result = Array.isArray(value) ? [] : {};
    if (map.get(value)) {
      return map.get(value);
    }
    map.set(value, result);
    const key = Array.isArray(value) ? undefined : Object.keys(value);
    forEach(key || value, (item, index) => {
      if (key) {
        index = item;
      }
      result[index] = deepClone(value[index], map);
    })
    // console.log('--------', result)
    return result;
  }
  return value;
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  f: {},
};

// target.target = target;
// const b = deepClone(target);
// console.log(b);
// console.log(target);

const y = { a: 1, c: 1 };
const x = { b: 2, a: 2 };
const z = { d: 1 }
// console.log(Object.assign(y, x))

// Object.prototype.assign1 = function (a, b) {
//   const obj = {};
//   const arr = [...new Set([...Object.keys(a), ...Object.keys(b)])];
//   arr.map(item => {
//     if(a[item]){
//       obj[item] = a[item];
//     }
//     if(b[item]){
//       obj[item] = b[item];
//     }
//   })
//   console.log(obj)
// }

// Object.assign1(y, x)

// for (let i in Object){
//   console.log(i, Object[i])
// }

Object.defineProperty(Object, 'assign2', {
  writable: true,
  configurable: true,
  // enumerable: true,
  value: function (...target) {
    const to = Object(target[0]);
    const obj = target.splice(1);
    obj.map(item => {
      Object.keys(item).map(i => {
        to[i] = item[i];
      })
    })
    return to;
  }
})

// (Object.assign2(y, x, z)

for (let i in Object) {
  console.log(i, Object[i])
}

/**
 * 判断属性是否可以枚举
 * Object.getOwnPropertyDescriptor(对象, 属性)
 * Object.propertyIsEnumerable(属性)
 */

// console.log(Object.getOwnPropertyDescriptor(Object, 'assign2'))
// console.log(Object.propertyIsEnumerable('assign2'))
class A {
  constructor() {
    console.log(this)
  }
  a = () => {

  }
  b = () => {

  }
}

new A()
// this.aaa = {
//   name: 111
// }
// this.bbb = [1, 2, 4];
// console.log(this)
const i = {
  iName: 'i'
}
const p = {
  pA: '123',
  pB: {
    name: 1
  }
}


function cloneDeep5(x) {
  const root = {};
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ];

  while (loopList.length) {
    const ele = loopList.pop();
    const parent = ele.parent;
    const data = ele.data;
    const key = ele.key;
    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        if (typeof data[i] === 'object') {
          loopList.push({
            parent: res,
            key: i,
            data: data[i]
          })
        } else {
          res[i] = data[i];
        }
      }
    }

    
  }

  return root;

}

const oo = {
  name: '123',
  age: {
    name: '1234'
  }
}

const ii = cloneDeep5(oo);
ii.age.name = '12345';
console.log('ii', oo, ii)





