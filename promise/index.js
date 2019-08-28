const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

function MyPromise(fn) {
  const _this = this;
  _this.state = PENDING;
  _this.value = null;
  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  // resolve函数
  function resolve(value) {
    setTimeout(function() {
      if (_this.state === PENDING) {
        _this.state = RESOLVED;
        _this.value = value;
        console.log(_this.resolvedCallbacks, "resolve");
        _this.resolvedCallbacks.map(cb => cb(_this.value));
      }
    });
  }

  // rejected函数
  function reject(value) {
    setTimeout(function() {
      if (_this.state === PENDING) {
        _this.state = REJECTED;
        _this.value = value;
        console.log(_this.rejectedCallbacks, "reject");
        _this.rejectedCallbacks.map(cb => cb(_this.value));
      }
    });
  }

  // 当创建对象的时候，执行传进来的执行器函数
  // 并且传递resolve和reject函数
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 为Promise原型链上添加then函数
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const _this = this;
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : r => {
          throw r;
        };
  if (_this.state === PENDING) {
    _this.resolvedCallbacks.push(onFulfilled);
    _this.rejectedCallbacks.push(onRejected);
  }

  console.log(_this.value, "value");
  if (_this.state === RESOLVED) {
    onFulfilled(_this.value);
  }
  if (_this.state === REJECTED) {
    onRejected(_this.value);
  }
  return _this;
};

// 测试
new MyPromise(function(resolve, reject) {
  setTimeout(() => {
    resolve("hello");
  }, 2000);
})
  .then(v => {
    console.log(v);
  })
  .then(v => {
    console.log(v + "1");
  });
