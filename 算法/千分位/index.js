function formatNum(num) {
  num = num + '';
  num = num.replace(/,/g, "")
  console.log(num, 111)
  if (/^[1-9]\d*$/.test(num))
    num = num.replace(/(?=(?!\b)(?:\d{3})+(?!\d))/g, ',');
  return num;
}
console.log(formatNum(10000))

(function () {
  function toThousands(num) {
    if (!(typeof num === 'string' || typeof num === 'number')) throw new TypeError('参数必须是数字或者字符串');
    num = num + '';
    var result = '';
    while(num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3)
    }

    if (num) {
      result = num + result;
    }
    return result;
  }

  console.log(toThousands(1000))
})();
