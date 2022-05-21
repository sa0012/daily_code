let timer = 0, timestamp = 1000, multiple = 1.5
const queryFn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      ++timer
      timestamp = timestamp * multiple
      console.log(timestamp / 1000, timer, 'test')
    }, timestamp)
  })
}
const callback = () => {
  if (timer === 3) return true;
  return false
}
function simplePoller(queryFn, callback) {
  // Implement your solution here
  let result = false;
  queryFn()
    .then(res => {
      console.log(12333334)
      result = callback && callback()
      if (result) return true
      simplePoller(queryFn, callback)
    })
}

simplePoller(queryFn, callback)
