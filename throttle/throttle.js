let throttle = function(fn, delay) {
  // 设置定时器
  let timer = null;
  // 定义开始时间
  let startTime = 0;

  return function() {
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
      timer = setTimeout(fn, remaining);
    }
  };
};

function handle() {
  console.log("函数节流");
}

window.addEventListener("scroll", throttle(handle, 1000));

(function() {
  var count = 1;
  var container = document.getElementById("container");

  function getUserAction() {
    container.innerHTML = count++;
  }

  var setUseAction = throttle(getUserAction, 10000);

  container.onmousemove = setUseAction;

  document.getElementById("button").addEventListener("click", function() {
    setUseAction.cancel();
  });

  function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = null;
    };

    return throttled;
  }
})();

(function() {
  /**
   * leading 代表首次是否执行，trailing 代表结束后是否再执行一次。
   * @param {Function} func
   * @param {Number} wait
   * @param {object} options { leading, trailing }
   */
  function throttle(func, wait, options) {
    var timeout, context, args;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = Array.prototype.slice(arguments);
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = null;
    };
    return throttled;
  }
})();

(function() {
  function throttle(func, wait, options = {}) {
    var context, args, timeout;
    var previous = 0;
    var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      func.apply(context, args);
      if (!timeout) context = args = null;
    };
    var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading !== false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = Array.prototype.slice.call(arguments);

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };
  }
})();
