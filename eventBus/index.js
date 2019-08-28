class EventEmitter {
  constructor () {
    this.events = this.events || new Map();
  }

  // 添加监听事件
  addListener (type, fn) {
    if (!this.events.get(type)) {
      this.events.set(type, fn);
    }
  }

  // 触发事件
  emit (type) {
    // 取出需要触发的事件
    let handle = this.events.get(type);
    handle.apply(this, [...arguments].slice(1))
  }
}

// 测试
let emitter = new EventEmitter()
// 监听事件
emitter.addListener('ages', age => {
  console.log(age)
})
// 触发事件
emitter.emit('ages', 18)  // 18