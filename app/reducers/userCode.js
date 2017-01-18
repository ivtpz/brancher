/* eslint-disable */
const userCode = (state=
`function (tree, pause, highlight) {
  class Node {
    constructor(value) {
      this.value = value;
      this.children = [];
    }
    add(value) {
      this.children.push(new Node(value));
    }
  }
  
  function traverse(node, callback) {
    highlight(node);
    node.children.forEach(child => {
      traverse(child, callback);
    })
  }
  traverse(tree)

  let newTree = new Node(1)
  pause(newTree);
  newTree.add(2);
  pause(newTree);
  newTree.add(3);
  pause(newTree);
  newTree.children[0].add(4);
  pause(newTree);
  newTree.children[0].add(5);
  pause(newTree);
  newTree.children[1].add(6);
  pause(newTree);
  newTree.children[1].add(7);
  pause(newTree);
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
