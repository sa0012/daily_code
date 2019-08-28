// 破解循环引用
// 保持引用关系
function cloneForce(x) {
  // =============
  const uniqueList = []; // 用来去重
  // =============

  let root = {};

  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x
    }
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      continue; // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res
    });
    // =============

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === "object") {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k]
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}

var b = {};
var a = { a1: b, a2: b };

a.a1 === a.a2; // true

var c = cloneForce(a);
c.a1 === c.a2; // true

// 破解循环引用
var a = {};
a.a = a;

cloneForce(a);

// 存在的问题
// 第一个问题，所谓成也萧何，败也萧何，如果保持引用不是你想要的，那就不能用cloneForce了；
// 第二个问题，cloneForce在对象数量很多时会出现很大的问题，如果数据量很大不适合使用cloneForce