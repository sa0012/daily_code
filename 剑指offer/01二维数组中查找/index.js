// 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
function Find(target, array) {
  // write code here
  let n = array.length, m = array[0].length;
  let row = n - 1, col = 0;

  if (n === 0 && m === 0) return false;

  while(row >= 0 && col <= m - 1) {
    if (array[row][col] > target) {
      row--;
    } else if (array[row][col] < target) {
      col++;
    } else {
      return true;
    }
  }
  return false;
}

var array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
var target = 4;
console.log(Find(target, array));