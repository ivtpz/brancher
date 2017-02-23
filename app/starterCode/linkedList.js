/* eslint-disable */
export default `function linkedList (pause, highlight) {
	class List {
    constructor(value) {
      this.head = null;
      this.tail = null;
    }
    addToTail(value) {
      var newTail = new Node(value);
      if (!this.head) {
        this.head = newTail;
      }
      if (this.tail) {
        this.tail.next = newTail;
      }
      this.tail = newTail;
    }
    traverse(cb) {
      let node = this.head;
      while (node) {
        cb(node)
        node = node.next;
      }
    }
  }

  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

	let newList = new List();
	for (var i = 0; i < 10; i++) {
	  newList.addToTail(Math.floor(Math.random()*30));
	  pause(newList);
	}
  newList.traverse(highlight)
	return newList;
}`;
