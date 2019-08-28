(function() {
  class Person {
    constructor({ name, age }) {
      this.name = name;
      this.age = age;
    }

    getName() {
      console.log("this is a " + this.name);
    }
  }

  class Student extends Person {
    constructor({ name, age, gender }) {
      super({ name, age });
    }

    sleep() {
      console.log(this.name + " is sleeping");
    }
  }

  let person1 = new Student({
    name: "张三",
    age: 23
  });

  console.log(person1.sleep());
  console.log(person1.getName());
})();

(function() {
  function Animal(name) {
    this.name = name;
  }

  Animal.getName = function() {
    console.log("this is a " + this.name);
  };

  Animal.prototype.sleep = function() {
    console.log(this.name + " is a sleeping");
  };

  let dog = new Animal("dog");
  // console.log(dog.getName()) // 静态方法， 实例无法访问
  console.log(dog.sleep());
  console.log(Animal.getName());
})();

// 实现 es6 class 使用寄生组合式继承
(function() {
  function Animal(name) {
    this.name = name;
  }

  Animal.staticFunc = function() {
    console.log("staticFunc");
  };
  Animal.prototype.sleep = function() {
    console.log("animal is sleeping");
  };

  function Dog(name, color) {
    Animal.call(this, name);
    this.color = color;
  }

  function inherit(subType, superType) {
    // 由于JavaScript引用类型和函数按值传递的特性，不能改变subType的引用地址
    subType.prototype = Object.create(superType.prototype, {
      constructor: {
        // 指向子类，和默认的继承行为保持一致
        value: subType,
        enumerable: false,
        configurable: true,
        writable: true
      }
    });

    // 子构造函数继承父构造函数(子类继承父类的静态方法和静态属性)
    Object.setPrototypeOf(subType, superType);
  }

  inherit(Dog, Animal);

  //需要在继承之后再往Dog中添加原型方法，否则会被覆盖掉
  Dog.prototype.barking = function() {
    console.log("wang!");
  };

  let brownTeddy = new Dog("teddy", "brown");
  Dog.staticFunc();
  console.log(brownTeddy);
  brownTeddy.sleep();
  brownTeddy.barking();
})();
