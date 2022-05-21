function parseCamel (str) {
  if (!str) return
  var reg = /-(\w)/g;
  return str.replace(reg, ($0, $1) => {
    return $1.toUpperCase()
  })
}

console.log(parseCamel('card-one-components'))
