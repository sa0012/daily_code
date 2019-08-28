const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 *
 * @param {function} excutor // 执行器
 */
function MyPromise(excutor) {
  // 缓存当前promise实例对象
  let that = this;
  // promise运行状态
  that.status = PENDING;
  // resolve结果
  that.value = null;
  // 拒因
  that.reason = null;
  // resolve回调函数集合
  that.onFulfilledCallbacks = [];
  // reject回调函数集合
  that.onRejectCallbacks = [];

  const resolve = value => {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.status === "pending") {
        // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.map(cb => cb(value));
      }
    }, 0);
  };

  const reject = reason => {
    if (that.status === "pending") {
      that.status = REJECTED;
      that.reason = reason;
      that.onRejectCallbacks.map(cb => cb(reason));
    }
  };

  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

/**
 * resolve中会存在的几种值
 * 1. 普通值
 * 2. promise对象
 * 3. thenable对象/函数
 */
/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 如果 promise2, x相等， 说明 promise1 onFulfilled 返回的对象与promise1.then返回的对象
  // 为同一个promise， 这样就会造成循环引用
  if (promise2 === x) {
    return reject(new TypeError("循环引用"));
  }

  // 设置开关， 避免多次调用
  let called = false;
  // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject);
        },
        reason => {
          reject(reason);
        }
      );
    } else {
      // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
      x.then(resolve, reject);
    }
    // 如果 x 为对象或者函数
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      // 是否是thenable对象（具有then方法的对象/函数）
      let then = x.then;
      if (typeof then === "function") {
        then(
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          reason => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
        // 说明是一个普通的对象/函数
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
    // 如果x是普通值， 直接resolve即可
  } else {
    resolve(x);
  }
}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // 缓存promise
  const that = this;
  let newPromises;
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected = typeof onRejected === "function" ? onRejected : reason => reason;
  // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
  // 原因:
  // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
  // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

  // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
  // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

  // 如下面这种情景 多次调用p1.then
  // p1.then((value) => { // 此时p1.status 由pending状态 => fulfilled状态
  //     console.log(value); // resolve
  //     // console.log(p1.status); // fulfilled
  //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
  //         console.log(value); // 'resolve'
  //     });
  //     console.log('当前执行栈中同步代码');
  // })
  // console.log('全局执行栈中同步代码');
  //

  // 成功状态
  if (that.status === FULFILLED) {
    return newPromises = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(newPromises, x, resolve, reject);
        } catch(e) {
          // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
          reject(e);
        }
      }, 0)
    })
  }

  // 失败状态
  if (that.status === REJECTED) {
    return newPromises = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(newPromises, x, resolve, reject);
        } catch(e) {
          reject(e);
        }
      }, 0)
    })
  }

  // 等待状态
  if (that.status === PENDING) {
    // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
    return newPromises = new MyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value);
          resolvePromise(newPromises, x, resolve, reject);
        } catch(e) {
          reject(e);
        }
      });

      that.onRejectCallbacks.push(reason => {
        try {
          let x = onRejected(reason);
          resolvePromise(newPromises, x, resolve, reject);
        } catch(e) {
          reject(e);
        }
      });
    })
  }
};

/**
 * 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
 * @param {function} onRejected
 */
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

/**
 * MyPromise.all
 * @param {Array} promises // promise对象数组
 */
MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let length = promises.length;
    let done = gen(length, resolve);

    promises.forEach((promise, index) => {
      promise.then(value => {
        done(index, value);
      }, reject);
    });
  });
}

function gen(length, resolve) {
  let count = 0;
  let values = [];
  return function (i, value) {
    values[i] = value;
    if (++count === length) {
      resolve(values);
    }
  }
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(resolve, reject);
    });
  })
}

/**
 * MyPromise.resolve 方式调用
 */
MyPromise.resolve = function (value) {
  return new MyPromise(resolve => {
    resolve(value);
  })
}

/**
 * MyPromise.reject 方式调用
 */
MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  })
}

try {
  module.exports = MyPromise;
} catch(e) {}