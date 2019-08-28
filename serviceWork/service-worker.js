// service-worker.js
// 虽然可以在里边为所欲为地写任何js代码，或者也可以什么都不写，
// 都不妨碍这是一个Service Worker，但还是举一个微小的例子：
self.addEventListener("fetch", function(event) {
  if (/\.jpg$/.test(event.request.url)) {
    event.respondWith(fetch("/2.jpg"));
  }
});
