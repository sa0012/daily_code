(function() {
  // 给定一个按照生序排列的整数数组 nums, 和一个目标值 target, 查找元素的第一和最后一个位置
  var searchRange = function(nums, target) {
    let left = 0;
    let mid;
    let right = nums.length;
    while (left < right) {
      mid = (left + right) >>> 1;
      if (nums[mid] > target) {
        right = mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] == target) {
        right = mid;
      }
    }
    let leftIndex = -1,
      rightIndex = -1;
    if (left == nums.length) {
      return [-1, -1];
    } else {
      console.log(left, 'left')
      leftIndex = nums[left] == target ? left : -1;
    }

    left = 0;
    right = nums.length;
    while (left < right) {
      mid = (left + right) >>> 1;
      if (nums[mid] > target) {
        right = mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] == target) {
        left = mid + 1;
      }
    }
    if (left == 0) return [-1, -1];
    else rightIndex = nums[left - 1] == target ? left - 1 : -1;

    return [leftIndex, rightIndex];
  };

  var nums = [5, 7, 7, 8, 8, 10];
  var target = 8;
  console.log(searchRange(nums, target));
})();
