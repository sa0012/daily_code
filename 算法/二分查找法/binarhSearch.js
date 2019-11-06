(function() {
  function binarySearch(arr, target) {
    let begin = 0;
    let end = arr.length; //写成这样，相当于搜索区间为[begin, end)，这是一个前闭后开的区间
    while (begin < end) {
      //重点:
      //因为前闭后开的区间，所以到了begin等于end时，其实区间内已经没有值了，直接停止
      let mid = (begin + end) >>> 1;
      if (arr[mid] == target) {
        return mid;
      } else if (arr[mid] > target) {
        end = mid - 1; //因为是闭区间，搜索范围变为[left, mid - 1]
      } else if (arr[mid] < target) {
        begin = mid + 1; //搜索范围变成[mid + 1, end]
      }
    }
    return -1;
  }

  var arr = [1, 2, 3, 4, 5, 6];
  console.log(binarySearch(arr, 4));
})();

(function () {
  const binarySearch = (array, target) => {
    // 标记开始位置
    let begin = 0;
    // 标记查找区间
    let end = array.length;
    while (begin < end) {
      let mid = (begin + end) >>> 1;
      if (array[mid] === target) {
        return mid;
      } else if (array[mid] > target) {
        end = mid - 1;
      } else if (array[mid] < target) {
        begin = mid + 1;
      }
    }
    return -1;
  }
  var arr = [1, 2, 3, 4, 5, 6];
  console.log(binarySearch(arr, 4));
})();
