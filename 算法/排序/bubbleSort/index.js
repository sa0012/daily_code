// 两个值进行交换位置
function swap(i,j,array){
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    // 位置判断标记
    var isSwap = false;
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j+1]) {
        isSwap = true;
        swap(j, j+1, array);
      }
    }

    if (!isSwap) break;
  }

  return array;
}
let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
console.log(bubbleSort(arr));

(function () {
  function swap (i, j, array) {
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  /**
   * 冒泡排序
   * @param {array} array 
   * @return {array}
   */
  function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
      // 判断是否交换位置的标记
      var isSwap = false;
      for (let j = 0; j < array.length - 1 - i; j++) {
        (array[j] > array[j+1]) && (isSwap = true) && swap(j, j+1, array);
      }

      if (!isSwap) break;
    }

    return array;
  }
})();