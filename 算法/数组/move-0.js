// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
function moveZero(nums) {
  var count = 0;
  if (nums.length <= 0) return nums;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1);
      count++;
      i--;
    }
  }

  while(count--) {
    nums.push(0);
  }

  return nums;
}


console.log(moveZero([1, 0, 2, 0, 3, 0, 4, 0, 5, 6]));