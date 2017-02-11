/* eslint-disable */
export default `function Tree (tree, pause, highlight, augment) {
  class Node {
    constructor(value) {
      this.value = value;
      this.children = [];
    }
    add(value) {
      this.children.push(new Node(value));
    }
    traverse(cb) {
      cb(this);
      for (let child of this.children) {
        child.traverse(cb);
      }
    }
  }
	let extendedTree = augment(tree, Node);
	extendedTree.traverse(highlight);

  let newTree = new Node(1)
  pause(newTree);
  newTree.add(2);
  pause(newTree);
  newTree.add(3);
  pause(newTree);
  newTree.traverse(highlight);
  return newTree;
}`
