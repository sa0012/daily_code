const selfFilter = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  let filterArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    fn.call(context, arr[i], i, this) && filterArr.push(arr[i])
  }

  return filterArr
}

const selfFilter1 = function (fn, context) {
  let arr = Array.prototype.slice.call(this);

  return arr.reduce((prev, cur, index) => fn.call(context, cur, index, this) ? [...prev, cur] : [...prev], [])
}

Array.prototype.selfFilter || (Object.defineProperty(Array.prototype, 'selfFilter', {
  value: selfFilter,
  enumerable: false,
  configurable: true,
  writable: true
}));

Array.prototype.selfFilter1 || (Object.defineProperty(Array.prototype, 'selfFilter1', {
  value: selfFilter1,
  enumerable: false,
  configurable: true,
  writable: true
}));

let arr = [1, 2, 3, 4, 5];
let filterArr = arr.selfFilter(item => item > 3);
let filterArr1 = arr.selfFilter1(item => item > 2);
console.log(filterArr, filterArr1)