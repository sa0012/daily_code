// 缓存每次计算的结果
(function() {
  function Fibonacci(n) {
    // write code here
    if (n <= 0) {
      return 0;
    } else if (n > 0 && n <= 2) {
      return 1;
    }
    let prev = 1,
      next = 1,
      result;
    for (let i = 2; i < n; i++) {
      result = prev + next;
      prev = next;
      next = result;
    }
    return result;
  }

  console.log(Fibonacci(3));
})();

// 使用递归的方式
(function() {
  function Fibonacci(n) {
    if (n <= 0) {
      return 0;
    } else if (n > 0 && n <= 2) {
      return 1;
    }

    return Fibonacci(n - 1) + Fibonacci(n - 2);
  }
  console.log(Fibonacci(5));
})();

// 使用动态规划的思想: 最优子结构、无后效性、子问题重叠
(function () {
  function Fibonacci(n) {
    let f = 1, g = 0;
    while(n--) {
      g += f;
      f = g - f;
    }

    return g;
  }
  console.log(Fibonacci(8));
})();