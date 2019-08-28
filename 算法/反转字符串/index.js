// 反转字符串

/**
 * 方法一
 * @param {string} str
 * @return {string}
 */
function reverseStr1(str) {
  if (typeof str !== "string") throw new TypeError("参数必须为字符类型");
  return str
    .split("")
    .reverse()
    .join("");
}

console.log(reverseStr1("qwert"));

/**
 * 方法二
 * @param {string} str
 * @return {string}
 */
function reverseStr2(str) {
  if (typeof str !== "string") throw new TypeError("参数必须为字符类型");
  let newStr = "",
    i = 0,
    len = str.length;
  while (i < len) {
    newStr += str[len - i - 1];
    i++;
  }

  return newStr;
}

console.log(reverseStr2("123456"));

function reverseStr3(str) {
  if (typeof str !== "string") throw new TypeError("参数必须为字符类型");
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }

  return newStr;
}

console.log(reverseStr3("123456"));