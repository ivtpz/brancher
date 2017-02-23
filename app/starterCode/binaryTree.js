/* eslint-disable */
export default `function BiTree (pause, highlight) {
	class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
    add(value) {
      if (value > this.value) {
        this.right ? this.right.add(value) : this.right = new Node(value);
      } else if (value < this.value){
        this.left ? this.left.add(value) : this.left = new Node(value);
      }
    }
    traverse(cb) {
      cb(this);
      if (this.left) this.left.traverse(cb);
      if (this.right) this.right.traverse(cb);
    }
  }

	let newTree = new Node(15);
	for (var i = 0; i < 10; i++) {
	  newTree.add(Math.floor(Math.random()*30));
	  pause(newTree);
	}
  newTree.traverse(highlight)
	return newTree;
}`;
