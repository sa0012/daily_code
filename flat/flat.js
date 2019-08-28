const flatten = function (depth = 1) {
  let arr = Array.prototype.slice.call(this)
  if (depth = 0) return [...arr]

  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return [...prev, ...flatten.call(cur, depth - 1)]
    } else {
      return [...prev, cur]
    }
  }, [])
}

Array.prototype.flatten || (Object.defineProperty(Array.prototype, 'flatten', {
  value: flatten,
  enumerable: false,
  configurable: true,
  writable: true
}));

let arr = [1, [2, [3, 4, [5, 6]]], 7];
let newArr = arr.flatten()
console.log(newArr)