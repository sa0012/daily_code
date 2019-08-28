const selfSome = function (fn, context) {
  let arr = Array.prototype.slice.call(this);

  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue

    let res = fn.call(context, arr[i], i, this)
    if (res) return true
  }

  return false
}

Array.prototype.selfSome || (Object.defineProperty(Array.prototype, 'selfSome', {
  value: selfSome,
  enumerable: false,
  configurable: true,
  writable: true
}));

let arr = [1, 2, 3, 4, 5];
let someResult = arr.selfSome(item => item > 2)
console.log(someResult)