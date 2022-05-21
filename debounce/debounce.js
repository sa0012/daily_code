function debounce (fn, wait = 50, immediate = true) {
  let timer, context, args = null;

  const later = () => setTimeout(() => {
    timer = null;
    if (!immediate) {
      fn.apply(context, args);
      context = args = null;
    }
  }, wait);

  return function (...params) {
    if (!timer) {
      timer = later();
      if (immediate) {
        fn.apply(this, params);
      } else {
        context = this;
        args = params;
      }
    } else {
      clearTimeout(timer);
      timer = later();
    }
  }
}