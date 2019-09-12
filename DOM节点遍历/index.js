(function() {
  // 深度优先遍历, 递归实现
  const cusGetElementByIdByDFS = function(parentNode, id) {
    if (parentNode) {
      var children = Array.from(parentNode.children);
      var target = null;

      if (parentNode.id === id) {
        return parentNode;
      }

      for (let i = 0; i < children.length; i++) {
        target = cusGetElementByIdByDFS(children[i], id);
        if (target) {
          return target;
        }
      }
    }
  };

  console.log(
    cusGetElementByIdByDFS(document.querySelector(".wrapper"), "demo")
  );
})();

(function() {
  // 深度遍历， 非递归
  const cusGetElementByIdByDFS = function(parentNode, id) {
    if (!parentNode) return null;

    var stack = [];
    var children = Array.from(parentNode.children);

    if (parentNode.id === id) return parentNode;

    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i]);
    }

    while (stack.length) {
      var node = stack.pop();

      if (node.id === id) {
        return node;
      } else {
        if (node.children.length > 0) {
          stack = Array.from(node.children).concat(stack);
        }
      }
    }
  };

  console.log(
    cusGetElementByIdByDFS(document.querySelector(".wrapper"), "demo")
  );
})();

(function() {
  // 广度优先， 非递归遍历
  const cusGetElementByIdByBFS = function(parentNode, id) {
    // 广度优先 非递归实现
    // 队列的思想: 采用出队的方式遍历节点，如果遍历到的节点有子节点，则将子节点入队
    const layer = []; // 按照顺序存放每个层级的每个节点
    if (parentNode) {
      layer.push({
        node: parentNode,
        depth: 1
      });

      while(layer.length) {
        var root = layer.shift();

        if (root.node.id === id) {
          return root;
        } else {
          var childrenNodes = Array.from(root.node.children || []);

          childrenNodes.forEach(node => {
            layer.push({
              node,
              depth: root.depth + 1
            });
          });
        }
      }
    }
    return null;
  };

  console.log(
    cusGetElementByIdByBFS(document.querySelector(".wrapper"), "demo")
  );
})();
