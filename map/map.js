// 循环实现 map
const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let mapArr = [];

  for (let i = 0; i < arr.length; i++) {
    // if (!arr.hasOwnProperty(i)) continue
    mapArr[i] = fn.call(context, arr[i], i, this)
  }

  return mapArr
}

const selfMap1 = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  return arr.reduce((prev, cur, index) => [...prev, fn.call(context, cur, index, this)], [])
}

// 挂载到 Array 原型上
Array.prototype.selfMap || (Object.defineProperty(Array.prototype, 'selfMap', {
  value: selfMap,
  enumerable: false,
  configurable: true,
  writable: true
}));

Array.prototype.selfMap1 || (Object.defineProperty(Array.prototype, 'selfMap1', {
  value: selfMap1,
  enumerable: false,
  configurable: true,
  writable: true
}));


let arr = [1, 2, 3, 4, 5];
let newArr = arr.selfMap(item => item + 'map')
let newArr1 = arr.selfMap1(item => item + 'map1')
console.log(newArr, newArr1)