const utils = {
  // 排序数组检测
  checkArray(array) {
    if (!array || array.length <= 2) return;
  },
  // 两值交换
  swap (array, left, right) {
    let rightValue = array[right];
    array[right] = array[left];
    array[left] = rightValue;
  }
};
