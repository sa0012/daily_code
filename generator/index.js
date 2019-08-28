// cb 也就是编译过的 test 函数
function generator(cb) {
  return (function() {
    var object = {
      next: 0,
      stop: function() {}
    };

    return {
      next: function() {
        var ret = cb(object);
        if (ret === undefined) return { value: undefined, done: true };
        return {
          value: ret,
          done: false
        };
      }
    };
  })();
}

(function() {
  // 使用 * 表示这是一个 Generator 函数
  // 内部可以通过 yield 暂停代码
  // 通过调用 next 恢复执行
  function* test() {
    let a = 1 + 2;
    yield 2;
    yield 3;
  }
  let b = test();
  console.log(b.next()); // >  { value: 2, done: false }
  console.log(b.next()); // >  { value: 3, done: false }
  console.log(b.next()); // >  { value: undefined, done: true }
})();
