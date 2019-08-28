// 正常输入 : http://localhost/#api?name=wz&age=12
// 输出 : {name:"wz",age=12}
// 特殊输入 : http://localhost:8000/api?name=wz=?1&age?=18#=2
// 输出 : {"name":"wz=?1","age?":"18"}
// 特殊输入 : ""
// 输出 : {}

function parseQueryString(url) {
  var arr;
  var res = {};
  //#符号之后的值称为hash，都不会加到request请求中去
  url = url.split("#")[0];
  //获取queryString 第一个？号后面的全是查询字符串
  arr = url.split("?");
  arr.shift();
  var queryStr = arr.join("?");
  //查询字符串为空直接返回 避免出现这样的返回值{"":""}
  if (queryStr.trim().length == 0) {
    return res;
  }

  //获取参数
  arr = queryStr.split("&");
  for (var i = 0; i < arr.length; i++) {
    var itemArr = arr[i].split("=");
    //第一个=号之前的是name 后面的全是值
    var name = itemArr.shift();
    var value = itemArr.join("=");
    res[name] = value;
  }
  return res;
}

