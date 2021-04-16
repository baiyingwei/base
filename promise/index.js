(function () {
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


  //promise.all便利数组，判断数组元素类型，promise 执行item.then, 不是的话当前索引的元素的位置等于元素
  //输出的位置按顺序的
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

  //遍历数组，拿到成功值直接resolve
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
})()

  //promise用法
  (function () {
    {
      //resolve一个reject状态的promise 走error
      const p1 = new Promise((_, reject) => {
        reject('error')
      });

      const p2 = new Promise(resolve => {
        resolve(p1);
      });

      p2.then(
        result => console.log(result),
        error => console.log('=======error=======', error) // error
      );
    }

    {
      //prmise执行状态已经改变不会再改变了
      let p = new Promise((resolve, reject) => {
        resolve('ok')
        throw new Error('error');
      })
      p.then(data => {
        console.log(data) //打印ok
      }).catch(e => {
        console.log(e)
      })
    }

    {
      //所有未被处理的错误冒泡到最后一个catch中
      const promise = new Promise(resolve => {
        resolve("resolve");
      });
      promise
        .then(value => {
          console.log(value);
          throw new Error("fail1");
        })
        .then(() => {
          throw new Error("fail2");
        })
        .catch(value => {
          console.log(value);
        })
        .then(() => {
          throw new Error("fail3");
        })
        .catch(value => {
          console.log(value);
        })
    }


    {
      Promise.prototype.finally(() => { }) //函数无参数，与状态无关
      const promise = new Promise(resolve => {
        resolve("resolve");
      });
      promise.finally(() => {
        console.log(11); // 11
      }); Promise.prototype.finally(() => { }) //函数无参数，与状态无关
      const promise = new Promise(resolve => {
        resolve("resolve");
      });
      promise.finally(() => {
        console.log(11); // 11
      });
    }
  })

