const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(excotor) {
  const that = this;
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
      setTimeout(() => {
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.map(cb => cb(value));
      });
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      setTimeout(() => {
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.map(cb => cb(reason));
      });
    }
  }

  try {
    excotor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new Error("循环引用"));
  }

  let called = false;
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
    let then = x.then;
    try {
      if (typeof then === "function") {
        then.call(
          x,
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
    resolve(x);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  let newPromise;

  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected = typeof onRejected === "function" ? onRejected : reason => reason;

  if (that.status === FULFILLED) {
    return (newPromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === REJECTED) {
    return (newPromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === PENDING) {
    return (newPromise = new MyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(value => {
        try {
          let x = onFulfilled(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      that.onRejectedCallbacks.push(reason => {
        try {
          let x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
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
  return new MyPromise((_resolve, reject) => {
    reject(reason);
  });
};

MyPromise.all = function(promises) {
  return new MyPromise((resolve, reject) => {
    let length = promises.length;
    let done = gen(length, resolve);

    promises.forEach((promise, index) => {
      promise.then(value => {
        done(index, value);
      }, reject);
    });
  });
};

function gen(length, resolve) {
  let count = 0;
  let values = [];

  return function(i, value) {
    values[i] = value;
    if (++count === length) {
      resolve(values);
    }
  };
}

MyPromise.race = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject);
    });
  });
};
