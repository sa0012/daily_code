function mockSetInterval(timeout) {
  return setTimeout(function() {
    setTimeout(arguments.callee, timeout);
  }, timeout);
}
