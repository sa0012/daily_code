// 判断是否是回文数
function numberOfTracts (str) {
  if (typeof str !== 'string') {
    throw new TypeError('参数类型必须为字符类型');
  }
  
  let newStr = '';
  newStr = str.split('').reverse().join('');
  return str === newStr;
}

function numberOfTracts1(str) {
  if (typeof str !== 'string') {
    throw new TypeError('参数类型必须为字符类型');
  }

  let newStr = '';
  let i = 0;
  let length = str.length;

  while (i < length) {
    newStr += str[lenth - i -1];
    i++;
  }

  return newStr === str;
}