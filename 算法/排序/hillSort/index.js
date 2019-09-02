(function() {
  // 希尔排序
  function hillSort(array, gap) {
    gap = !gap ? 1 : gap; //默认从下标为1的元素开始遍历
    var length = array.length,
      index,
      current;
    for (var i = gap; i < length; i++) {
      index = i - gap; //待比较元素的下标
      current = array[i]; //当前元素
      while (index >= 0 && array[index] > current) {
        //前置条件之一:待比较元素比当前元素大
        array[index + gap] = array[index]; //将待比较元素后移gap位
        index -= gap; //游标前移gap位
      }
      if (index + gap != i) {
        //避免同一个元素赋值给自身
        array[index + gap] = current; //将当前元素插入预留空位
      }
    }
    return array;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(hillSort(arr, 0));
})();

(function() {
  // 希尔排序
  function hillSort(array, gap) {
    gap = !gap ? 1 : gap;
    let length = array.length, index, current;
    for (let i = gap; i < length; i++) {
      index = i - gap;
      current = array[i];
      while (index >= 0 && array[index] > current) {
        array[index + gap] = array[index];
        index -= gap;
      }

      if (index + gap !== i) {
        array[index + gap] = current;
      }
    }

    return array;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(hillSort(arr, 0));
})();
