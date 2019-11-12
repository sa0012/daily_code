let arr = [9, 1, 0, 4, 7, 2, 5, 6, 8, 3];

function swap(i, j, array) {
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function quickSort(array, left, right) {
  var partitionIndex,
    left = typeof left == 'number' ? left : 0,
    right = typeof right == 'number' ? right : array.length - 1;
  if (left < right) {
    partitionIndex = partition(array, left, right); //切分的基准值
    quickSort(array, left, partitionIndex - 1);
    quickSort(array, partitionIndex + 1, right);
  }
  return array;
}

function partition(array, left, right) { //分区操作
  for (var i = left + 1, j = left; i <= right; i++) { //j是较小值存储位置的游标
    array[i] < array[left] && swap(i, ++j, array); //以第一个元素为基准
  }
  swap(left, j, array); //将第一个元素移至中间
  return j;
}

console.log(quickSort(arr))