/* eslint-disable */
const userCode = (state=
`function (tree, pause, highlight, augment) {
  class Node {
    constructor(value) {
      this.value = value;
      this.children = [];
    }
    add(value) {
      this.children.push(new Node(value));
    }
    traverse(callback) {
      callback(this);
      highlight(this);
      for (let child of this.children) {
        child.traverse(callback);
      }
    }
  }
	let extendedTree = augment(tree, Node)
	extendedTree.traverse(()=>true)

  let newTree = new Node(1)
  pause(newTree);
  newTree.add(2);
  pause(newTree);
  newTree.add(3);
  return newTree;
}`, action) => {
  switch (action.type) {
    case 'UPDATE_CODE':
      return action.newCode
    default:
      return state;
  }
};

export default userCode;
