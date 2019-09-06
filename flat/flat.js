(function() {
  const flatten = function(depth = 1) {
    let arr = Array.prototype.slice.call(this);
    if ((depth = 0)) return [...arr];

    return arr.reduce((prev, cur) => {
      if (Array.isArray(cur)) {
        return [...prev, ...flatten.call(cur, depth - 1)];
      } else {
        return [...prev, cur];
      }
    }, []);
  };

  Array.prototype.flatten ||
    Object.defineProperty(Array.prototype, "flatten", {
      value: flatten,
      enumerable: false,
      configurable: true,
      writable: true
    });

  let arr = [1, [2, [3, 4, [5, 6]]], 7];
  let newArr = arr.flatten();
  console.log(newArr);
})();

(function() {
  // 递归方式
  function flatten(array) {
    var result = [];
    for (var i = 0, len = array.length; i < len; i++) {
      if (Array.isArray(array[i])) {
        result = result.concat(flatten(array[i]));
      } else {
        result.push(array[i]);
      }
    }

    return result;
  }

  let arr = [1, [2, [3, 4, [5, 6]]], 7];
  console.log(flatten(arr));
})();

(function() {
  // while方式
  function flatten(array) {
    while (array.some(item => Array.isArray(item))) {
      array = [].concat(...array);
    }

    return array;
  }

  let arr = [1, [2, [3, 4, [5, 6]]], 7];
  console.log(flatten(arr));
})();

(function() {
  // reduce方式
  function flatten(array) {
    return array.reduce((prev, cur, index) => {
      return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
  }

  let arr = [1, [2, [3, 4, [5, 6]]], 7];
  console.log(flatten(arr));
})();
