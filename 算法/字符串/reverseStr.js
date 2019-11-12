// 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。
function numToReverseStr(num) {
  var numStr = num + '';
  if (numStr.length > 1) {
    var newStr = numStr.substr(numStr.length - 1, 1);
    var oldStr = numStr.substr(0, numStr.length - newStr.length);
    return newStr + numToReverseStr(+oldStr);
  } else {
    return numStr;
  }
}

console.log(numToReverseStr(1234567890))