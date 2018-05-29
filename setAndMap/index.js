//新的数据结构 set 类似于数组， 成员值唯一

const arr = [1, 3, 4, 5, 6, 7, 7];
const set = new Set(arr);

//set.add(1) 像set结构添加成员

//数组去重两种方法

console.log(Array.from(set))
console.log([...new Set(arr)])

//set 认为 NAN 等于自身, 空对象不相同（{} !== {}）

let set1 = new Set();
let a = NaN;
let b = NaN;
set1.add(a);
set1.add(b);

console.log(set1)

//set 实例方法，操作方法
//add(value) 添加某个值，返回Set结构本身
//delete(value) 删除摸个值，返回布尔值，表示删除成功
//has(value) 返回布尔值，表示该值是否是Set的成员
//clear() 清除所有成员，没有返回值

//set的遍历顺序就是插入顺序
console.log(set.entries())

//Map
//传统对象只能 字符串当作键，Map类似于对象，也是键值对结合，但是键的范围不限于字符串

//map的键跟内存地址绑定，内存不相同视为两个键

const map = new Map();
const k1 = ['a'];
const k2 = ['a'];
map.set(k1, 111).set(k2, 222);
console.log(map.get(k1), map.get(k2))

//Map有以下属性和方法
//1.size
let map1 = new Map();
map1.set('foo', true);
map1.set('bar', false);
console.log(map1.size);

//2.set(key, value) => 返回整个map结构

//3.get(key) => 读取对应键值，找不到key，返回undefined

//4.has(key) => boolean

//5.delete(key) => boolean

//6.clear() => 无返回值

/*
循环属性
1.keys() 返回键名
2.values() 返回键值
3.entries() 返回所有成员
4.forEach() 遍历map所有成员
 */

let map2 = new Map([
  ['F', 'no'],
  ['T', 'yes']
])

for (let [key, value] of map2.entries()) {
  console.log(key, value)
}

console.log([...map2.values()])
console.log([...map2])

//map转化为数组
let map3 = new Map().set(true, 7).set({foo: 3}, ['abc']);
console.log(map3, [...map3])

//数组转化为map
let sp = ['2', '3'];
console.log(new Map([sp]));

//map转对象

let map4 = new Map().set('yes', true).set('no', false);

function mapToObj(strMap) {
  let obj = Object.create(null);
  for (let [key, value] of strMap){
    obj[key] = value
  }

  return obj;
}

console.log(mapToObj(map4))

//对象转化为map

let obj1 = {yes: true, no: false};

function objToMap(objStr) {
  let strMap = new Map();
  for (let k of Object.keys(objStr)){
    strMap.set(k, objStr[k]);
  }
  return strMap;
}

console.log(objToMap(obj1))