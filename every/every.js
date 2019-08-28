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