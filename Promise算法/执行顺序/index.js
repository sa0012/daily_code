(function() {
  const first = () =>
    new Promise((resolve, reject) => {
      console.log(3);
      let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
          console.log(5);
          resolve(6);
        }, 0);
        resolve(1);
      });
      resolve(2);
      p.then(arg => {
        console.log(arg);
      });
    });

  first().then(arg => {
    console.log(arg);
  });
  console.log(4);
})();

// 第一次执行同步任务 输出结果为 3， 7, 4
// 第二次执行微任务， 1， 2
// 最后一次执行宏任务， 输出 5， setTimeout内部的resolve(6)不会执行， 因为promise一旦改变就不会在改变了