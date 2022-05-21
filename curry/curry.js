(function () {
  function curry(fn, args) {
    var length = fn.length;
    args = args || [];
  
    return function(){
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
  }
  
  function multiFn(a, b, c) {
    return a * b * c;
  }
  
  var multi = curry(multiFn);
  
  console.log(multi(2)(3)(4));
  console.log(multi(2, 3, 4));
  console.log(multi(2)(3, 4));
  console.log(multi(2, 3)(4));
})();

(function () {
  // es6版本
  // const curry = (fn, arr = []) => (...args) => (
  //   arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg)
  // )([...arr, ...args]);

  const curry = (fn, arr = []) => (...args) => (
    arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg)
  )([...arr, ...args]);

  function multiFn(a, b, c) {
    return a * b * c;
  }
  
  var multi = curry(multiFn);
  
  // console.log(multi(2)(3)(4));
  // console.log(multi(2, 3, 4));
  // console.log(multi(2)(3, 4));
  // console.log(multi(2, 3)(4));
})();

(function () {
  function curry (fn, args) {
    const length = fn && fn.length
    args = args || []

    return function () {
      let newArgs = args.concat(Array.prototype.slice.call(arguments));
      if (newArgs.length < length) {
        return curry.call(this, fn, newArgs);
      } else {
        return fn.apply(this, newArgs)
      }
    }
  }
  function multiFn(a, b, c) {
    return a * b * c;
  }
  
  var multi = curry(multiFn);
  
  console.log(multi(2)(3)(4));
  // console.log(multi(2, 3, 4));
  // console.log(multi(2)(3, 4));
  // console.log(multi(2, 3)(4));
})();