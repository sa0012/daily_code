// 斐波那契数列：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ... 求第n个数是多少
// 第一个数: 1 = 1
// 第二个数: 1 = 1
// 第三个数: 2 = 1 + 1
// 第四个数: 3 = 2 + 1
// 第五个数: 5 = 3 + 2
// 第六个数: 8 = 5 + 3

/**
 * 递归
 * @param {number} n
 */
function fibonacci1(n) {
  if (typeof n !== "number") throw new Error("参数必须为整数");
  if (n <= 2) return 1;
  return fibonacci1(n - 1) + fibonacci1(n - 2);
}

console.log(fibonacci1(6));

/**
 * 方法二
 * @param {number} n
 */
function fibonacci2(n) {
  let tem = [1, 1];
  if (typeof n !== "number") throw new Error("参数必须为整数");
  if (n <= 2) return 1;
  // 数组索引从0开始，数列索引从1开始
  for (let i = 2; i < n; i++) {
    tem[i] = tem[i - 1] + tem[i - 2];
  }
  return tem[n - 1];
}

console.log(fibonacci2(6));

/**
 * 方法三
 * @param {number} n 
 */
function fibonacc3(n) {
  if (typeof n !== "number") throw new Error("参数必须为整数");
  if (n <= 2) return 1;
  let prev = 1, 
		next = 1,
    res;
    
  for (let i = 2; i < n; i++) {
    res = prev + next;
    prev = next;
    next = res;
  }

  return res;
}

console.log(fibonacc3(6));