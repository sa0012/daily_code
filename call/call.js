function selfCall(context) {
  context = typeof context === "object" ? context : window;
  // 定义一个唯一的函数名
  let fn = Symbol(this);
  context[fn] = this;
  const args = [...arguments].slice.call(1);
  context[fn](...args);
  delete context[fn];
}

Function.prototype.selfCall ||
  Object.defineProperty(Function.prototype, "selfCall", {
    value: selfCall,
    enumerable: false,
    configurable: true,
    writable: true
  });

// call 方法使用
var obj = {
  name: "dddd",
  age: 23,
  getName: function() {
    console.log(this.name, this);
  }
};

obj.getName(); // 这是obj this指向， {name: "dddd", age: 23, getName: ƒ}

var obj1 = {
  name: "eeee",
  age: 24,
  getName: function() {
    console.log(this.name, this);
  }
};

obj.getName.call(obj1); // 这是obj this指向， {name: "eeee", age: 24, getName: ƒ}
obj.getName.selfCall(obj1)
