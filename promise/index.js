function Promise(fn) {
  this.status = 'pending';
  this.successCallback = [];
  this.failCallback = [];
  this.value = null;
  this.err = null;
  const resolve = (value) => {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'success';
        this.successCallback.map(item => item());
      }
    }, 0)
  }
  const reject = (err) => {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.err = err;
        this.status = 'fail';
        this.failCallback.map(item => item());
      }
    }, 0)
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolveFn(promise, x, resolve, reject) {
  if (promise === x) {
    reject('循环引用')
  }
  try {
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      let then = x.then;
      if (typeof then === 'function') {
        try {
          then.call(x, (value) => {
            resolveFn(promise, value, resolve, reject);
          }, (err) => {
            reject(err);
          })
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (successFn, failFn) {
  let promise2 = new Promise((resolve, reject) => {
    if (this.status === 'pending') {
      this.successCallback.push(() => {
        setTimeout(() => {
          try {
            let x = successFn(this.value);
            resolveFn(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }

        }, 0)
      })
      this.failCallback.push(() => {
        setTimeout(() => {
          try {
            if (typeof failFn === 'function') {
              let x = failFn(this.err);
              reject(x);
            } else {
              reject(this.err);
            }
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    } else if (this.status === 'success') {
      setTimeout(() => {
        let x = successFn(this.value);
        resolveFn(promise2, x, resolve, reject);
      }, 0)
    } else if (this.status === 'fail') {
      setTimeout(() => {
        try {
          if (typeof failFn === 'function') {
            let x = failFn(this.err);
            resolveFn(promise2, x, resolve, reject);
          } else {
            reject()
          }
        } catch (e) {
          reject(e)
        }
      }, 0)
    }
  });
  return promise2;
}

Promise.prototype.catch = function (fn) {
  this.then(null, fn);
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  })
}

Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value);
  })
}


Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let count = 0;
    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      const then = item.then;
      if (then && typeof item.then === 'function') {
        then.call(item, val => {
          arr[i] = val;
          count++;
        }, reject)
      } else {
        arr[i] = item;
        count++;
      }

    }
    if (count === values.length) {
      resolve(arr);
    }
  })
}

Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    values.map((item, index) => {
      const then = item.then;
      if (then && typeof item === 'function') {
        then.call(item, val => {
          resolve(val);
        }, reject)
      } else {
        resolve(item);
      }
      count++;
    })
  })
}

new Promise((resolve, reject) => {
  resolve(2)
}).then(res => {
  console.log('res', res)
  return new Promise((resolve, reject) => {
    reject('new promise');
  })
}).catch(res => {
  console.log('res2', res)
});

Promise.all([1, new Promise((resolve, reject) => reject(2)), 3]).then(res => {
  console.log('resresresresres', res)
}).catch(res => {
  console.log('错误了', res)
});

Promise.race([1, new Promise((resolve, reject) => resolve(2)), 3]).then(res => {
  console.log('raceraceraceracerace', res)
});
