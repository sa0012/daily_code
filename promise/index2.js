const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(execure) {
  var that = this;
  that.status = PENDING;
  that.value = null;
  that.reason = null;
  that.onFulfilledCallbacks = [];
  that.onRejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }

    if (that.status === PENDING) {
      setTimeout(function() {
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.map(cb => cb(value));
      });
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      setTimeout(function() {
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.map(cb => cb(reason));
      });
    }
  }

  try {
    execure(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new Error("循环引用"));
  }

  var called = false;
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
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    var then = x.then;
    try {
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            resolvePromise(promise2, y, resolve, reject);
          },
          reason => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
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
  } else {
    reject(x);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  var that = this,
    newPromise;

  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected = typeof onRejected === "function" ? onRejected : reason => reason;

  if (that.status === FULFILLED) {
    return (newPromise = new MyPromise((resolve, reject) => {
      setTimeout(function() {
        try {
          var x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === REJECTED) {
    return (newPromise = new MyPromise((resolve, reject) => {
      setTimeout(function() {
        try {
          var x = onRejected(that.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === PENDING) {
    that.onFulfilledCallbacks.push(value => {
      try {
        var x = onFulfilled(value);
        resolvePromise(newPromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });

    that.onRejectedCallbacks.push(reason => {
      try {
        var x = onRejected(reason);
        resolvePromise(newPromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }
};

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

MyPromise.resolve = function(value) {
  return new MyPromise(resolve => {
    resolve(value);
  });
};

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

MyPromise.all = function(promises) {
  if (Object.prototype.toString.call(promises) !== "[object Array]") {
    return new TypeError("参数类型必须为数组");
  }
  var length = promises.length;
  var done = gen(length, this.resolve);
  promises.forEach((promise, index) => {
    promise.then(value => {
      done(index, value);
    }, reject);
  });
};

function gen(length, resolve) {
  var values = [];
  var count = 0;

  return function(i, value) {
    values[i] = value;
    if (++count === length) {
      resolve(values);
    }
  };
}

MyPromise.race = function(promises) {
  if (Object.prototype.toString.call(promises) !== "[object Array]") {
    return new TypeError("参数类型必须为数组");
  }

  return new MyPromise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject);
    });
  });
};
