function swap(i, j, array) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function bubbleSort(array) {
  for (var i = 0; i < array.length; i++) {
    var isSwap = false;
    for (var j = 0; j < array.length - i -1; j++) {
      array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
    }

    if (!isSwap) break;
  }

  return array;
}

let arr = [9, 1, 0, 4, 7, 2, 5, 6, 8, 3];
console.log(bubbleSort(arr));

(function () {
  /**
   * @name 方案一：内外循环都是正向遍历
   * @param {array} array 
   */
  function bubbleSort1(array) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
      var isSwap = false;
      for (var j = 0; j < length - i -1; j++) {
        array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
      }

      if (!isSwap) break;
    }
    return array;
  }

  /**
   * @name 方案二：外部正向遍历/内部循环反向遍历
   * @param {array} array 
   */
  function bubbleSort2(array) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
      var isSwap = false;
      for (var j = length - 1; j >= i + 1; j--) {
        array[j - 1] > array[j] && (isSwap = true) && swap(j, j -1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }

  /**
   * @name 方案三: 外循环逆序遍历, 内循环正序遍历
   * @param {array} array 
   */
  function bubbleSort3(array) {
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
      var isSwap = false;
      for (var j = 0; j < i; j++) {
        array[j] > array[j+1] && (isSwap = true) && swap(j,j+1,array);
      }

      if (!isSwap) break;
    }

    return array;
  }

  /**
   * @name 方案四: 外循环逆序遍历, 内循环逆序遍历,
   * @param {array} array 
   */
  function bubbleSort4(array) {
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
      var isSwap = false;
      for (var j = length - 1; j >= length - i - 1; j--) {
        array[j - 1] > array[j] && (isSwap = true) && swap(j, j -1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }

  console.log(bubbleSort1(arr), 1)
  console.log(bubbleSort2(arr), 2)
  console.log(bubbleSort3(arr), 3)
  console.log(bubbleSort4(arr), 4)
})();