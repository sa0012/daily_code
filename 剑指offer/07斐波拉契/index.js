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
    console.log(result, prev, next)
  }
  return result;
}

console.log(Fibonacci(3))