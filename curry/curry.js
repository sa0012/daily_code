(function() {
  function curry(fn, args) {
    var length = fn.length;
    var args = args || [];

    console.log(length, args, "init");
    return function() {
      newArgs = args.concat(Array.prototype.slice.call(arguments));
      console.log(newArgs.length, length, "length");
      if (newArgs.length < length) {
        return curry.call(this, fn, newArgs);
      } else {
        return fn.apply(this, newArgs);
      }
    };
  }

  function multiFn(a, b, c) {
    return a * b * c;
  }

  var multi = curry(multiFn);

  // console.log(multi(2)(3)(4));
  // console.log(multi(2, 3, 4));
  // console.log(multi(2)(3, 4));
  // console.log(multi(2, 3)(4));
})();

(function() {
  // es6版本
  // const curry = (fn, arr = []) => (...args) => (
  //   arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg)
  // )([...arr, ...args]);

  const curry = (fn, arr = []) => (...args) =>
    (arg => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
      ...arr,
      ...args
    ]);

  function multiFn(a, b, c) {
    return a * b * c;
  }

  var multi = curry(multiFn);

  console.log(multi(2)(3)(4));
  // console.log(multi(2, 3, 4));
  // console.log(multi(2)(3, 4));
  // console.log(multi(2, 3)(4));
})();

(function() {
  function curry(func, args = []) {
    var length = func.length;

    return function() {
      var newArgs = args.concat(Array.prototype.slice.call(arguments));
      if (newArgs.length < length) {
        return curry.call(this, func, args);
      } else {
        return func.apply(this, newArgs);
      }
    };
  }

  function multiFn(a, b, c) {
    return a * b * c;
  }

  var multi = curry(multiFn);
  console.log(multi(2)(3)(4), "func");
})();

(function() {
  const curry = (func, arr) => (...args) => (
    arg => (arg.length === func.length ? func(...arg) : curry.call(func, arg))
  )([
    ...arr,
    ...args
  ]);

  function multiFn(a, b, c) {
    return a * b * c;
  }

  var multi = curry(multiFn);
  console.log(multi(1)(2)(3), "es6");
})();
