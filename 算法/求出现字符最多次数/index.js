function countStr(str) {
  if (typeof str !== "string") throw new TypeError("参数类型必须为string");
  let strArr = str.split("");
  let result = strArr.reduce((p, c) => {
    p[c]++ || (p[c] = 1);
    return p;
  }, {});

  return result;
}

// 对数组对象进行排序
let strArr = countStr("aaaabbbssssccceeeilkjs");

console.log(countStr("aaaabbbssssccceeeilkjs"));
