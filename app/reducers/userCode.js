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
      // passing a node to highlight
      // shows which node the traverse
      // method is currently being called on
      highlight(this);
      for (let child of this.children) {
        child.traverse(callback);
      }
    }
  }
	
	// The line below is necessary to add
	// methods from the node class
	// to the tree object passed
	// as an argument to this code editor
	let extendedTree = augment(tree, Node)
	// Now you can call the methods from
	// the Node class on the passed in 
	// tree object
	extendedTree.traverse(()=>true)

  let newTree = new Node(1)
  // passing a tree object to pause
  // will display the current object
  // in the visualizer 
  pause(newTree);
  newTree.add(2);
  pause(newTree);
  newTree.add(3);
  pause(newTree);
  
  // The returned object gets rendered
  // in the visualizer
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
