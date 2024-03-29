// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

// 二叉树遍历规则
// 前序遍历（VLR）： 
//     1.访问根节点 
//     2.前序遍历左子树 
//     3.前序遍历右子树 
// 中序遍历（LVR）： 
//     1.中序遍历左子树 
//     2.访问根节点 
//     3.中序遍历右子树 
// 后序遍历（LRV）： 
//     1.后序遍历左子树 
//     2.后序遍历右子树 
//     3.访问根节点

// 总之，做这种有关树、链表的题一定要有递归的思想，总之该题的解题思路就是四步

// 1 确定根,确定左子树，确定右子树。
// 2 在左子树中递归。
// 3 在右子树中递归。
// 4 打印当前根。
function reConstructBinaryTree(pre, vin)
{
    // write code here
    if (!pre.length || !vin.length) return null;

    // 找到跟节点
		let index = vin.indexOf(pre[0]);
		let left = vin.slice(0, index);
		let right = vin.slice(index + 1);

    return {
			val: pre[0],
			left: reConstructBinaryTree(pre.slice(1, index + 1), left),
			right: reConstructBinaryTree(pre.slice(index + 1), right)
    }
}