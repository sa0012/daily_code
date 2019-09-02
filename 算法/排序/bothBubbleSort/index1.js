function swap(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

(function () {
  function bothBubbleSort(array) {
    let tail = array.length - 1, i, isSwap = false;
    for (i = 0; i < tail; tail--) {
      for (var j = tail; j > i; j--) {
        array[j - 1] > array[j] && (isSwap = true) && swap(j, j - 1, array);
      }

      i++;

      for (j = i; j < tail; j++) {
        array[j] > array[j + 1] && (isSwap = true) && swap(j, j + 1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(bothBubbleSort(arr));
})();

