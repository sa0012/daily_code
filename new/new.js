function selfNew () {
  // new 一个实例会创建一个新的对象
  let obj = Object.create({});
  // 去除 new 函数的构造器, unshift 会改变原数组， 返回第一个参数
  Constructor = [].unshift.call(arguments);
  // 将obj的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
  obj.__proto__ = Constructor.prototype;
  // 使用apply改变构造函数this的指向到新建的对象，这样obj就可以访问到构造函数中的属性
  let ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}

function Otaku(name, age) {
  this.name = name;
  this.age = age;
  this.habit = "Games";
}

Otaku.prototype.sayYourName = function() {
  console.log("I am " + this.name);
};

var person = selfNew(Otaku, "Kevin", "18");

console.log(person.name); // Kevin
console.log(person.habit); // Games
person.sayYourName(); // I am Kevin
