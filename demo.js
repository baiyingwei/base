function sum(a, b, c, d, e) {
  // console.log(1)
  return a + b + c + d + e;
}

function curry(fn, arr = []) {
  const len = fn.length;
  return (...args) => {
    arr = [...arr, ...args];
    if (arr.length < len) {
      return curry(fn, arr);
    } else {
      return fn(...arr);
    }
  }
}

const a = curry(sum)(1)(2)(3)(4)(5);
// console.log(a)

function add(a) {
  const sum = (b) => add(a + b);
  sum.getA = () => a;
  return sum;
}
console.log(add(1)(2)(3).getA()); //6
// console.log(add(1)(2)(3)(4)); //10
