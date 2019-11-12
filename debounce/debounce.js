function debounce (fn, wait) {
  let timeout = null;

  return function () {
    if (!!timeout) clearTimeout(timeout)
    timeout = setTimeout(fn, wait);
  }
}

(function() {
  let oInput = document.querySelector(".debounce");
  function handler() {
    console.log("防抖");
  }
  oInput.addEventListener("input", debounce(handler, 1000));
})();
