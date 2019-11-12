let arr = [9, 1, 0, 4, 7, 2, 5, 6, 8, 3];
function swap(i, j, array) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function bothBubbleSort(array) {
  var tail = array.length - 1, i, isSwap = false;
  for (i = 0; i < tail; tail--) {
    // 第一层将最小值排序到前面
    for (var j = tail; j > i; j--) {
      array[j - 1] > array[j] && (isSwap = true) && swap(j, j - 1, array);
    }
    i++;
    for (j = i; j < tail; j++) {
      array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
    }
  }

  return array;
}

console.log(bothBubbleSort(arr));

(function () {
  function BothBubbleSort1(array) {
    var tail = array.length, i, isSwap = false;
    for (i = 0; i < tail; tail--) {
      for (var j = tail; j > i; j--) {
        array[j - 1] > array[j] && (isSwap = true) && swap(j, j - 1, array);
      }
      i++;
      for (j = i; j < tail; j++) {
        array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
      }
    }

    return array;
  }
})();