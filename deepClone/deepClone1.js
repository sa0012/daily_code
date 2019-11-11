const getType = obj => Object.prototype.toString.call(obj);
const isObject = target =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

// 可以遍历的对象
const canTraverse = {
  "[object Map]": true,
  "[object Set]": true,
  "[object Object]": true,
  "[object Array]": true,
  "[object Arguments]": true
};

const mapTag = "[object Map]";
const setTag = "[object Set]";
const boolTag = "[object Boolean]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

// 处理正则拷贝
const handleRegExp = target => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

// 处理函数的拷贝
const handleFunc = func => {
  // 如果是箭头函数， 直接返回自身
  if (!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (!body) return null;
  if (param) {
    const paramArr = param[0].split(",");
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
};

// 处理普通的数据类型
const handleNotTraverse = (target, tag) => {
  const Ctor = target.constructor;
  switch (tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target));
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) return target;
  let type = getType(target);
  let cloneTarget;
  if (!canTraverse[type]) {
    return handleNotTraverse(target, type);
  } else {
    let ctor = target.constructor;
    cloneTarget = new ctor();
  }

  // 拷贝过的就不在进行拷贝， 防止重复引用
  if (map.get(target)) return target;
  map.set(target, true);

  if (type === mapTag) {
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map));
    })
  }

  if (type === setTag) {
    target.forEach(item => {
      cloneTarget.add(deepClone(item, map));
    })
  }

  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }

  return cloneTarget;
}
