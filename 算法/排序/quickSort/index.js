// 快速排序借用了分治的思想, 并且基于冒泡排序做了改进.
// 它由C. A. R. Hoare在1962年提出. 它将数组拆分为两个子数组,
// 其中一个子数组的所有元素都比另一个子数组的元素小,
// 然后对这两个子数组再重复进行上述操作, 直到数组不可拆分, 排序完成.
function swap(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

(function() {
  function quickSort(array, left, right) {
    var partitionIndex,
      left = typeof left == "number" ? left : 0,
      right = typeof right == "number" ? right : array.length - 1;
    if (left < right) {
      partitionIndex = partition(array, left, right); //切分的基准值
      quickSort(array, left, partitionIndex - 1);
      quickSort(array, partitionIndex + 1, right);
    }
    return array;
  }
  function partition(array, left, right) {
    //分区操作
    for (var i = left + 1, j = left; i <= right; i++) {
      //j是较小值存储位置的游标
      array[i] < array[left] && swap(i, ++j, array); //以第一个元素为基准
    }
    swap(left, j, array); //将第一个元素移至中间
    return j;
  }

  let arr = [9, 0, 3, 7, 2, 1, 5, 4, 6, 8];
  console.log(quickSort(arr, 0, 1));
})();

// 快速排序排序效率非常高. 虽然它运行最糟糕时将达到O(n²)的时间复杂度,
//  但通常, 平均来看, 它的时间复杂为O(nlogn),
// 比同样为O(nlogn)时间复杂度的归并排序还要快.
// 快速排序似乎更偏爱乱序的数列, 越是乱序的数列, 它相比其他排序而言,
// 相对效率更高. 之前在 捋一捋JS的数组 一文中就提到:
// Chrome的v8引擎为了高效排序, 在排序数据超过了10条时,
// 便会采用快速排序. 对于10条及以下的数据采用的便是插入排序.
// Tips: 同选择排序相似, 快速排序每次交换的元素都有可能不是相邻的,
// 因此它有可能打破原来值为相同的元素之间的顺序. 因此, 快速排序并不稳定.

(function() {
  function quickSort(array, left, right) {
    let partitionIndex,
      left = typeof left === "number" ? left : 0,
      right = typeof right === "number" ? right : array.length - 1;

    if (left < right) {
      partitionIndex = partition(array, left, right);
      quickSort(array, left, partitionIndex - 1);
      quickSort(array, partitionIndex + 1, right);
    }

    return array;
  }

  function partition(array, left, right) {
    for (let i = left + 1, j = left; i <= right; i++) {
      array[i] < array[left] && swap(i, ++j, array);
    }

    swap(left, j, array);
    return j;
  }
})();

(function() {
  function quickSort(arr) {
    if (arr.length <= 1) return arr;

    //取数组最接近中间的数位基准，奇数与偶数取值不同，但不印象，当然，你可以选取第一个，或者最后一个数为基准，这里不作过多描述
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    //左右区间，用于存放排序后的数
    var left = [];
    var right = [];

    console.log("基准为：" + pivot + " 时");
    for (var i = 0; i < arr.length; i++) {
      console.log("分区操作的第 " + (i + 1) + " 次循环：");
      //小于基准，放于左区间，大于基准，放于右区间
      if (arr[i] < pivot) {
        left.push(arr[i]);
        console.log("左边：" + arr[i]);
      } else {
        right.push(arr[i]);
        console.log("右边：" + arr[i]);
      }
    }
    //这里使用concat操作符，将左区间，基准，右区间拼接为一个新数组
    //然后递归1，2步骤，直至所有无序区间都 只剩下一个元素 ，递归结束
    return quickSort(left).concat([pivot], quickSort(right));
  }

  var arr = [14, 3, 15, 7, 2, 76, 11];
  console.log(quickSort(arr));
  /*
   * 基准为7时，第一次分区得到左右两个子集[ 3, 2,]   7   [14, 15, 76, 11];
   * 以基准为2，对左边的子集[3,2]进行划分区排序,得到[2] 3。左子集排序全部结束
   * 以基准为76，对右边的子集进行划分区排序,得到[14, 15, 11] 76
   * 此时对上面的[14, 15, 11]以基准为15再进行划分区排序， [14, 11] 15
   * 此时对上面的[14, 11]以基准为11再进行划分区排序， 11  [14]
   * 所有无序区间都只剩下一个元素，递归结束
   *
   */
})();
