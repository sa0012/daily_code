// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
// 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
// 示例：
// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

(function () {
  // 暴力遍历
  var twoSum = function (nums, target) {
    var result = [];
    for (let i = 0, len = nums.length; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (nums[i] + nums[j] === target) {
          result.push(i);
          result.push(j);
          return result;
        }
      }
    }
  };

  let nums = [2, 7, 11, 15, 1, 8, 0, 9],
    target = 9;
  console.log(twoSum(nums, target));
})();

(function () {
  // hash表
  var twoSum = function (nums, target) {
    var result = new Map();
    var len = nums.length;
    var diff = 0;
    var out = [];
    for (var i = 0; i < len; i++) {
      diff = target - nums[i];
      var diffVal = result.get(diff);
      if (result.has(diff) && diffVal != i) {
        out.push(i);
        out.push(diffVal);
        return out;
      } else {
        result.set(nums[i], i);
      }
    }
  };

  let nums = [2, 7, 11, 15, 1, 8, 0, 9],
    target = 9;
  console.log(twoSum(nums, target));
})();