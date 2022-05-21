const selfEvery = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let everyArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue

    fn.call(context, arr[i], i, this) && everyArr.push(arr[i])
  }

  return everyArr.length === arr.length ? true : false
}

Array.prototype.selfEvery || (Object.defineProperty(Array.prototype, 'selfEvery', {
  value: selfEvery,
  enumerable: false,
  configurable: true,
  writable: true
}));

let arr = [1, 2, 3, 4, 5];
let everyResult = arr.selfEvery(item => item > 2);
console.log(everyResult)

function febonacci (n) {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  return febonacci(n - 1) + febonacci(n - 2);
}

function febonacci1 (n) {
  let f = 1, g = 0;
  while (n--) {
    g += f;
    f = g - f;
  }

  return g;
}

function febonacci2 (n) {
  let tem = [1, 1];
  if (n <= 2) return 1;
  for (let i = 2; i < n; i++) {
    tem[i] = tem[i - 1] + tem[i - 2];
  }

  return tem[n - 1];
}
