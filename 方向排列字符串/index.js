function getRvs(str) {
  var tmp = "";
  for (var i = str.length - 1; i >= 0; i--) {
    tmp += str[i];
  }
  return tmp;
}

function getRvs1 (str) {
  if (str.length > 0) {
    var strArr = [];
    let strArr1 = str.split('')

    for (let i = strArr1.length - 1; i >= 0; i--) {
      strArr.push(strArr1[i]);
    }

    return strArr.join('')
  }
}

var str = "QWEERTY";
console.log(getRvs(str));
console.log(getRvs1(str));
