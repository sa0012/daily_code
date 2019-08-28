// 定义：如果将一个文本翻转过来，能和原文本完全相等，那么就可以称之为“回文”。

/**
 * 方法一
 * @param {string|number} str 需要判断的文字
 * @return {boolean} bool 是否为回文
 * 效率不高， 会产生一个变量
 */
function isPalindrome1(char) {
  // 允许输入字符串和数字和布尔值
  if (typeof char !== "string") char = char.toString();
  let result = char
    .split("")
    .reverse()
    .join("");
  return char === result;
}

console.log(isPalindrome1(121));
console.log(isPalindrome1(3344));

/*
 * 判断文字是否为回文
 * @param {string|number} str 需要判断的文字
 * @return {boolean} bool 是否为回文
 */
function isPalindrome2(str) {
  if (typeof char !== "string") char = char.toString();
  // 这里为什么 i <= j 呢？如果中间只有一个字符，是不需要比较的，它肯定等于它本身！！！
  for (let i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str[i] !== str[j]) {
      return false;
    }
  }

  return true;
}

console.log(isPalindrome1(121));
console.log(isPalindrome1(3344));
