// 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。
// 请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
function rectCover(number) {
  // write code here
  if (number === 0) return 0;
  let f = 1, g = 2;
  while(--number) {
    g += f;
    f = g - f;
  }

  return f;
}

console.log(rectCover(3))