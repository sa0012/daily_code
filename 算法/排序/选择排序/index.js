let arr = [9, 1, 0, 4, 7, 2, 5, 6, 8, 3];

function swap(i, j, array) {
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function selectSort(array) {
  var length = array.length,
    min;
  for (var i = 0; i < length - 1; i++) {
    min = i;
    for (var j = i + 1; j < length; j++) {
      // 记住最小数的下标
      array[j] < array[min] && (min = j);
    }

    min !== i && swap(i, min, array);
  }

  return array;
}

console.log(selectSort(arr));

(function () {
  function selectSort(array) {
    var length = array.length,
      min;
    for (var i = 0; i < length - 1; i++) {
      for (var j = i + 1; j < length; j++) {
        // 最小值索引
        array[j] < array[min] && (min = i);
      }

      min !== i && swap(i, min, array);
    }

    return array;
  }
})();