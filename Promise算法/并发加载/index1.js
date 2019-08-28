// 有 8 个图片资源的 url，已经存储在数组 urls 中（即urls = ['http://example.com/1.jpg', ...., 'http://example.com/8.jpg']），而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。
// 但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。
// 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
var urls = [
  "https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg",
  "https://www.kkkk1000.com/images/getImgData/gray.gif",
  "https://www.kkkk1000.com/images/getImgData/Particle.gif",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.png",
  "https://www.kkkk1000.com/images/getImgData/arithmetic2.gif",
  "https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg",
  "https://www.kkkk1000.com/images/getImgData/arithmetic.gif",
  "https://www.kkkk1000.com/images/wxQrCode2.png"
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log('一张图片加载完成');
      resolve();
    };

    img.onerror = reject;
    img.src = url;
  })
}

function limitImg(urls, handler, limit) {
  const sequence = [].concat(urls);
  const promises = [];

  promises = sequence.splice(0, limit).map((item, index) => {
    return handler(url).then(() => {
      return index;
    });
  });

  return sequence
    .reduce((prev, next, currentIndex) => {
      return last
        .then(() => {
          return Promise.race(promises);
        })
        .catch(err => {
          console.error(err);
        })
        .then(res => {
          promises[res] = handler(sequence[currentIndex]).then(() => {
            return res;
          })
        })
    }, Promise.resolve());
}