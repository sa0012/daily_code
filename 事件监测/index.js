var eventshiv = {
  // event兼容
  getEvent: function(event) {
    return event ? event : window.event;
  },

  // type兼容
  getType: function(event) {
    return event.type;
  },

  // target兼容
  getTarget: function(event) {
    return event.target ? event.target : event.srcelem;
  },

  // 添加事件句柄
  addHandler: function(elem, type, listener) {
    if (elem.addEventListener) {
      elem.addEventListener(type, listener, false);
    } else if (elem.attachEvent) {
      elem.attachEvent("on" + type, listener);
    } else {
      // 在这里由于.与'on'字符串不能链接，只能用 []
      elem["on" + type] = listener;
    }
  },

  // 移除事件句柄
  removeHandler: function(elem, type, listener) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, listener, false);
    } else if (elem.detachEvent) {
      elem.detachEvent("on" + type, listener);
    } else {
      elem["on" + type] = null;
    }
  },

  // 添加事件代理
  addAgent: function(elem, type, agent, listener) {
    elem.addEventListener(type, function(e) {
      if (e.target.matches(agent)) {
        listener.call(e.target, e); // this 指向 e.target
      }
    });
  },

  // 取消默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  // 阻止事件冒泡
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};
