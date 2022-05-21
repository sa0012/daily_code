(function () {
  function selfBind (context) {
    const _this = this;
    const args = Array.prototype.slice(arguments, 1);
    function Fn () {}
    const bindFn = function () {
      _this.apply(
        this instanceof _this ? this : context,
        Array.prototype.slice(1).concat(args)
      )
    }

    Fn.prototype = this.prototype;
    bindFn.prototype = new Fn();

    return bindFn;
  }

  function mybind (context) {
    const args1 = Array.prototype.slice(arguments, 1);
    const _this = this;
    const Fn = function () {}
    const bindFn = function () {
      _this.apply(this instanceof _this ? this : context, Array.prototype.slice(arguments).concat(args))
    }

    Fn.prototype = this.prototype;
    bindFn.prototype = new Fn();

    return bindFn;
  }
})();