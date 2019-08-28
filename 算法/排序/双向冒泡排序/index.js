function swap(i, j, array) {
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];

function bothwayBubbleSort(array) {
  var tail = array.length - 1,
    i,
    isSwap = false;
  for (i = 0; i < tail; tail--) {
    for (var j = tail; j > i; j--) {
      //第一轮, 先将最小的数据冒泡到前面
      array[j - 1] > array[j] && (isSwap = true) && swap(j, j - 1, array);
    }
    i++;
    for (j = i; j < tail; j++) {
      //第二轮, 将最大的数据冒泡到后面
      array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
    }
  }
  return array;
}

console.log(bothwayBubbleSort(arr));

(function() {
  function bothBubbleSort(array) {
    let tail = array.length - 1, i, isSwap = false;
    for (i = 0; i < tail; i--) {
      for (var j = tail; j < i; j--) {
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
