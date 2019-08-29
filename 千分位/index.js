// 实现数字格式化为千分位
(function () {
  function parseToNum(num) {
    if (typeof num !== 'number') {
      throw new TypeError('参数必须为数字类型');
    }

    let result = (num).toString().split('.');
    let ret = result[0].split('');
    let rest = (result.splice(1) || '').join('');
    let length = ret.length;
    let newStr = '';
    while (length > 3) {
      newStr += ',' + ret.splice(-3, 3).join('');
      length = ret.length;
    }

    return ret.join('') + newStr + (rest && `.${rest}`);
  }

  console.log(parseToNum(10000000000000.111))
})();

(function () {
  function parseToNum(num) {
    if (typeof num !== 'number') {
      throw new TypeError('参数必须为数字类型');
    }
    // (?<=\d)                 #当前位置前面必须是数字
    // (?<!\.\d*)              #当前位置前面不能是小数点
    // (?=(\d{3})+(\.|$))      #当前位置是3个数字的循环，最后到小数点或结束
    num = (num).toString();
    return num.replace(/(?<=\d)(?<!\.\d*)(?=(\d{3})+(\.|$))/g, ',')
  }

  console.log(parseToNum(10000000000000.1234))
})();