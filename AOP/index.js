// 面向切面编程：动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面的编程。
Function.prototype.before = function (beforeFn) {
  const that = this;
  let oArgs = Array.prototype.slice.call(arguments, 1);
  return function () {
    let iArgs = Array.prototype.slice.call(arguments);
    beforeFn.apply(this, oArgs.concat(iArgs));
    console.log(oArgs.concat(iArgs), 'before')
    return that.apply(this, oArgs.concat(iArgs));
  }
}

Function.prototype.after = function (afterFn) {
  const that = this;
  let oArgs = Array.prototype.slice.call(arguments, 1);
  return function () {
    let iArgs = Array.prototype.slice.call(arguments);
    let result = that.apply(this, oArgs.concat(iArgs));
    afterFn.apply(this, oArgs.concat(iArgs));
    console.log(oArgs.concat(iArgs), 'after')
    return result;
  }
}

function test() {
  console.log('test');
}

test = test.before(function () {
  console.log('before');
}, 'this is a before').after(function () {
  console.log('after');
}, 'this is a after');

test()