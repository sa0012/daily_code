function swap(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

(function() {
  function selectSort(array) {
    let length = array.length,
      min;
    for (let i = 0; i < length - 1; i++) {
      min = i;
      for (let j = length - 1; j > i; j--) {
        array[min] > array[j] && (min = j);
      }

      if (min !== i) swap(min, i, array);
    }
    return array;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(selectSort(arr));
})();
