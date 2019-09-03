// 函数防抖， 一段时间只执行一次， 如果再目标时间内再次触发， 会以当前时间为起点再次延迟
/**
 *
 * @param {Function} func // 回调函数
 * @param {String | Number} wait // 延迟时间
 * @param {Boolean} immediate // 立即执行
 */
function debounce(func, wait, immediate) {
  var timeout, result;

  var debounced = function() {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

(function() {
  let oInput = document.querySelector(".debounce");
  function handler() {
    console.log("防抖");
  }
  oInput.addEventListener("input", debounce(handler, 1000));
})();

(function() {
  function debounce(func, wait, immediate = true) {
    let timeout, result;

    var debounced = function() {
      var context = this;
      var args = Array.prototype.slice(arguments);

      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(function() {
          timeout = null;
        }, wait);

        if (callNow) result = func.apply(context, args);
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, wait);
      }

      return result;
    };

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  }

  var count = 1;
  var container = document.querySelector(".debounce");
  function getUserAction(e) {
    container.innerHTML = count++;
  }

  var setUseAction = debounce(getUserAction, 10000, true);

  container.onmousemove = setUseAction;

  document.getElementById("button").addEventListener("click", function() {
    setUseAction.cancel();
  });
})();
