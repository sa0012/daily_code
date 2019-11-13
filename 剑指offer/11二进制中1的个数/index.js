// 输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示
// 此种方法， 二进制表示中有多少个1， 就执行多少次循环， 关键点在于 (n & n - 1)
function NumberOf1(n)
{
    // write code here
    let count = 0;
    while(n) {
      n = n & n - 1;
      count++;
    }

    return count;
}