(function() {
  // 什么是迭代器
  // 一个对象必须实现[Symbol.iterator]方法，其返回一个符合迭代器协议的对象
  // 什么是迭代器协议？迭代器协议要求一个对象实现next方法，其返回一个包含两个属性的对象：
  // done: true/false，只是有没有超过可迭代次数
  // value: 任何JavaScript值，done为true时可以省略

  var arr = [1, 2, 3, 4];
  for (let k of arr) {
    console.log(arr[k], k);
  }
})();

(function() {
  // TypeError: obj is not iterable
  // var obj = { name: 1111, age: 222 };
  // for (let k of obj) {
  //   console.log(obj[k], k);
  // }
  // object类型没有部署 iterator迭代器， 所以不能使用 for-of 去迭代遍历

  // 根据迭代器的实现， 可以改造实现 object 类型可实现 for-of
  let obj = {
    [Symbol.iterator]() {
      const max = 5;
      let count = 0;

      return {
        next() {
          return {
            value: ++count,
            done: count === max
          };
        }
      };
    }
  };

  for (let k of obj) {
    console.log(k);
  }
})();

(function() {
  // 如何实现一个for-of
  function forOf(obj, callback) {
    let iterator = obj[Symbol.iterator]();
    let { value, done } = iterator.next();

    while (!done) {
      callback(value);
      let o = iterator.next();
      value = o.value;
      done = o.done;
    }
  }

  forOf([5, 6, 7, 8], k => {
    console.log(k);
  });
})();

(function() {
  // 生成器与Promise结合
  // 生成器在执行过程中是可以暂时挂起的，并且挂起状态是不会阻塞主线程的，
  // 后续可以用next方法让其被唤醒继续执行。Promise可以在未来触发某种条件的情况下得到事先承诺的值，
  // 本身也就是用来处理异步任务的，将其与生成器结合，可以更优雅地去处理异步任务
  function _async(generator) {
    const iterator = generator();
    console.log(iterator, 'iterator')
    function handle(iteratorResult) {
      console.log(iteratorResult, 'iteratorResult');
      const { value, done } = iteratorResult;

      if (done) {
        return;
      }

      if (value instanceof Promise) {
        value
          .then(v => handle(iterator.next(v)))
          .catch(error => iterator.throw(error));
      }
    }

    try {
      handle(iterator.next());
    } catch (error) {
      iterator.throw(error);
    }
  }

  function getAsyncData(wait) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(wait);
      }, wait * 1000);
    });
  }

  _async(function*() {
    const result1 = yield getAsyncData(1);
    console.log(result1);

    const result2 = yield getAsyncData(2);
    console.log(result2);

    const result3 = yield getAsyncData(3);
    console.log(result3);
  });
})();
