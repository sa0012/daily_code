  /**
   * 方法一
   * 递归 (容易造成递归爆栈)
   */

  function factorialize1(n) {
    if (typeof n !== "number") throw new Error("参数必须为整数");
    if (n === 1) return n;
    return n * factorialize1(n-1);
  }

  console.log(factorialize1(3));
  
  /**
   * 尾递归
   * @param {number} n 
   * @param {number} m 
   */
  function factorialize2 (n, m) {
    if (typeof n !== "number") throw new Error("参数必须为整数");
    if (n === 1) return m;
    return factorialize2(n - 1, n * m);
  }

  console.log(factorialize2(4, 1));
  
  /**
   * 深度遍历
   * @param {number} n 
   */
  function factorialize3 (n) {
    if (typeof n !== "number") throw new Error("参数必须为整数");
    if (n === 1) return n;
    let total = 1;
    while (n > 1) {
      total *= n;
      n--;
    }

    return total;
  }

  function factor (n) {
    if (n === 1) return 1;
    let total = 1;
    while (n > 1) {
      total *= n;
      n--;
    }

    return total;
  }

  console.log(factorialize3(4));