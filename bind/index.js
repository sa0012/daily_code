(function() {
  function selfBind(context) {
    let bindArgs = Array.prototype.slice(arguments, 1);
    let _this = this;
    let Fn = function() {};
    let bindFn = function() {
      let args = Array.prototype.slice(arguments);
      return _this.apply(
        this instanceof bindArgs ? this : context,
        bindArgs.concat(args)
      );
    };

    // 维护原型
    if (this.prototype) {
      Fn.prototype = this.prototype;
    }

    bindFn.prototype = new Fn();
    return bindFn;
  }

  Function.prototype.selfBind ||
    Object.defineProperty(Function.prototype, "selfBind", {
      value: selfBind,
      enumerable: false,
      configurable: true,
      writable: true
    });
})();

(function() {
  function selfBind(context) {
    var _this = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var Fn = function() {};
    var BindFn = function() {
      var _args = args.concat(Array.prototype.slice.call(arguments));
      return _this.apply(this instanceof BindFn ? this : context, _args);
    };

    if (this.prototype) {
      Fn.prototype = this.prototype;
    }

    BindFn.prototype = new Fn();
    return BindFn;
  }

  Function.prototype.selfBind || (
    Object.defineProperty(Function.prototype, 'selfBind', {
      value: selfBind,
      enumerable: false,
      configurable: true,
      writable: true
    })
  );
})();
