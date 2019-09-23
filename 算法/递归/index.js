(function() {
  // 阶乘
  // 规则: 1 * 2 = 2, 1 * 2 * 3 * ... * n
  function factorial(n = 1, total = 1) {
    if (n <= 1) return total;
    return factorial(n - 1, n * total);
  }

  console.log(factorial(5, 1));
})();

(function() {
  // 斐波那契数列（Fibonacci sequence），又称黄金分割数列，
  // 指的是这样一个数列：1、1、2、3、5、8、13、21、34、……
  // 在数学上，斐波那契数列以如下被以递推的方法定义：F(1)=1，F(2)=1, F(n)=F(n-1)+F(n-2)（n>=3，n∈N*）
  function factorial2(n, start = 1, total = 1) {
    if (n <= 2) return total;
    return factorial2(n - 1, total, total + start);
  }

  console.log(factorial2(9));
})();

(function() {
  // 1. 普通队列求和 1 + 2 + 3 + 4
  function sum1(n, total = 1) {
    if (n <= 1) return total;
    return sum1(n - 1, n + total);
  }

  console.log(sum1(10));
})();

(function() {
  // n =1; result = 1  --> 1
  // n =2; result = 2  --> 11 2
  // n =3; result = 3  --> 111 12 21
  // ...
  // 如果第一步走1个台阶，由以上规律可以发现剩下的台阶有n-1种走法；
  // 如果第一步走2个台阶，由以上规律可以发现剩下的台阶有n-2种走法；
  // 则一共有fn(n-1) + fn(n-2) 种走法

  function steps(n) {
    if (n <= 1) return 1;
    return steps(n - 1) + steps(n - 2);
  }

  console.log(steps(10));
})();

(function() {
  let obj = {
    a: "1",
    b: {
      c: "2",
      D: {
        E: "3"
      }
    }
  };
  // 转化为如下：
  // let obj = {
  //     a: '1',
  //     b: {
  //         c: '2',
  //         d: {
  //             e: '3'
  //         }
  //     }
  // }
  function ObjectToFormat(obj) {
    var reg = /[A-Z]+/g;
    if (typeof obj === "object") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          var temp = obj[key];

          if (reg.test(key.toString())) {
            temp = obj[key.replace(reg, function (result) {
              return result.toLowerCase()
            })] = obj[key];

            delete obj[key];
          }
        } 

        if (typeof temp === 'object') {
          ObjectToFormat(temp);
        }
      }
    }
    return obj;
  }

  console.log(ObjectToFormat(obj));
})();
