// 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。

var inStack = [], outStack = [];

// 队列的特点： 先进先出
function push(node) {
  inStack.push(node);
}

function pop() {
  // 添加的时候需要判断下outStack的长度
  if (!outStack.length) {
    while(inStack.length) {
      // 倒序插入， 最先进去的排列到最前面
      outStack.push(inStack.pop());
    }
  }

  return outStack.pop();
}