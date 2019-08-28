// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现）三个亮灯函数已经存在：
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

function light (cb, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer)
  })
}

var step = function () {
  Promise.resolve().then(res => {
    return light(red, 3000);
  }).then(res => {
    return light(green, 1000);
  }).then(res => {
    return light(yellow, 2000);
  }).then(res => {
    step();
  })
};

step();