/***
 * 自定义事件
 * 订阅-发布模式
 */

class EventListener {
  constructor() {
    this.handlers = []
  }

  listen(type, handler) {
    if (this.handlers[type] === undefined) {
      this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
  }
  trigger(type, ...args) {
    const callbackArr = this.handlers[type];
    if (callbackArr === undefined || callbackArr.length === 0) return false;
    for (let i = 0; i < callbackArr.length; i++) {
      callbackArr[i].apply(this, args)
    }

  }
  remove(type, handler) {
    if (this.handlers[type] === undefined) return false;
    this.handlers[type] = this.handlers[type].filter(item => item !== handler)
  }
}

function sendMessage(message, list) {
  if (!Array.isArray(list)) {
    return
  }

  for (let i = 0; i < list.length; i++) {
    list[i].trigger('$on', message)
  }
}
function closeMessage(message) {
  console.log('jane已经收到消息：' + message);
  console.log('jane放弃触发');
}

let tom = new EventListener();
let jane = new EventListener();
let jack = new EventListener();

tom.listen('$emit', () => {
  console.log('订阅消息');
  sendMessage('我已经到达目的地', [jane, jack])
});

jane.listen('$on', closeMessage);

jack.listen('$on', (message) => {
  console.log('jack已经收到消息：' + message);
  console.log('jack准备出发了');
});

jane.remove('$on', closeMessage)

tom.trigger('$emit');