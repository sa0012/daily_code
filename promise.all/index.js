var promise1 = new Promise((resolve, reject) => {
  reject(1111111);
});

var promise2 = new Promise((resolve, reject) => {
  resolve(2222222);
});

var promise3 = new Promise((resolve, reject) => {
  resolve(33333333);
});

// promise.all中有一个promise执行失败返回reject时，promise.all直接返回执行失败的promise结果
// Promise.all([promise1, promise2, promise3]).then(res => {
//   console.log(res, 'response')
// });

var promiseArray = [promise1, promise2, promise3];
// Promise.all([promise1, promise2, promise3].map(item => {
//   return item.catch(err => {
//     return err
//   })
// })).then(res => {
//   console.log(res, 'response')
// }).catch(err => {
//   console.log(err, 'error')
// })

var handlePromise = Promise.all(
  promiseArray.map(function(promiseItem) {
    return promiseItem.catch(function(err) {
      return err;
    });
  })
);

handlePromise.then(function(values) {
  console.log('all promise are resolved', values)
}).catch(function(reason) {
  console.log('promise reject failed reason', reason)
})