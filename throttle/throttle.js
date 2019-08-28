let throttle = function (fn, delay) {
  // 设置定时器
  let timer = null;
  // 定义开始时间
  let startTime = 0;

  return function () {
    // 获取当前时间
    let curTime = Date.now();
    // 计算时间差
    let remaining = delay - (curTime - startTime);
    // 获取上下文环境
    let context = this;
    let args = arguments;
    // 每次开始时都启用新的定时器
    clearTimeout(timer);

    // 判断是否达到延迟时间， 第一次一定会执行
    if (remaining <= 0) {
      fn.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(fn, remaining)
    }
  }
}

function handle () {
  console.log('函数节流')
}

window.addEventListener('scroll', throttle(handle, 1000))