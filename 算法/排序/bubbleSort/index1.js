function swap(i, j, arr) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 内外层都是正序遍历
(function() {
  function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
      var isSwap = false;
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }
  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(bubbleSort(arr));
})();

// 外层正序遍历，内层倒序遍历
(function () {
  function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
      var isSwap = false;
      for (let j = array.length - 1; j >= i + 1; j--) {
        array[j - 1] > array[j] && (isSwap = true) && swap(j, j - 1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(bubbleSort(arr, '2'));
})();

// 外层倒序遍历，内层正序遍历
(function () {
  function bubbleSort(array) {
    let length = array.length, isSwap;
    for (let i = length - 1; i >= 0; i--) {
      isSwap = false;
      for (let j = 0; j < i; j++) {
        array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(bubbleSort(arr));
})();

// 内外层倒序遍历
(function () {
  function bubbleSort(array) {
    let length = array.length, isSwap;
    for (let i = length - 1; i >= 0; i--) {
      isSwap = false;
      for (let j = length - 1; j > length - i -1; j--) {
        array[j - 1] > array[j] && (isSwap = true) && swap(j, j - 1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(bubbleSort(arr));
})();
