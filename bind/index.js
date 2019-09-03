(function () {
  function selfBind(context) {
    let bindArgs = Array.prototype.slice(arguments, 1);
    let _this = this;
    let Fn = function () {}
    let bindFn = function () {
      let args = Array.prototype.slice(arguments);
      return _this.apply(this instanceof bindArgs ? this : context, bindArgs.concat(args));
    }

    // 维护原型
    if (this.prototype) {
      Fn.prototype = this.prototype;
    }

    bindFn.prototype = new Fn();
    return bindFn
  }

  Function.prototype.selfBind || (Object.defineProperty(Function.prototype, 'selfBind', {
    value: selfBind,
    enumerable: false,
    configurable: true,
    writable: true
  }))
})();