(function() {
  // 双重for循环
  function unique(array) {
    let newArr = [];
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < newArr.length; j++) {
        if (array[i] === newArr[j]) {
          break;
        }
      }

      if (j === newArr.length) {
        newArr.push(array[i]);
      }
    }

    return newArr;
  }

  var array = [1, 1, "1", "1", 2, 2, 3, 3, 4, 5];
  console.log(unique(array));
})();

(function() {
  // indexOf去重
  function unique(array) {
    var newArr = [];
    for (var i = 0, len = array.length; i < len; i++) {
      if (newArr.indexOf(array[i]) === -1) {
        newArr.push(array[i]);
      }
    }

    return newArr;
  }

  var array = [1, 1, "1", "1", 2, 2, 3, 3, 4, 5];
  console.log(unique(array));
})();

(function() {
  // filter去重
  function unique(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  var array = [1, 1, "1", "1", 2, 2, 3, 3, 4, 5];
  console.log(unique(array));
})();

(function() {
  // 对于 1， "1", NaN, 对象的去重
  function unique(array) {
    var obj = {};
    return array.filter(item => {
      return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    });
  }

  var array = [{ value: 1 }, { value: 1 }, { value: 2 }];
  console.log(unique(array));
})();
