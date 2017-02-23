/* eslint-disable */
export default `function Tree (pause, highlight) {
  class Node {
    constructor(value) {
      this.value = value;
      this.children = [];
      this._id = Math.floor(Math.random()*10000);
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

  let newTree = new Node(1)
  pause(newTree);
  newTree.add(2);
  pause(newTree);
  newTree.add(3);
  pause(newTree);
  newTree.traverse(highlight);
  return newTree;
}`
