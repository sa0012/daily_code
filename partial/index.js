// 偏函数

// 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
// 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
var _ = {};

function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var position = 0,
      len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i]
    }
    while (position < arguments.length) args.push(argumetns[position++]);
    return fn.apply(this, args);
  };
};

var subtract = function(a, b) { return b - a; };
subFrom20 = partial(subtract, _, 20);

console.log(subFrom20(5));