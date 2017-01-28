/* eslint-disable */
const themes = [
  'monokai',
  'tomorrow_night_eighties',
  'tomorrow_night_blue',
  'kuroir',
  'katzenmilch',
  'chrome'
]

const userCode = (state = {
userCode: `function Tree (tree, pause, highlight, augment) {
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
  return newTree;
}`,
altCode: `function BiTree (tree, pause, highlight, augment) {
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
  
	let extendedTree = augment(tree, Node);
	extendedTree.traverse(highlight);
		
	
	let newTree = new Node(15);
	for (var i = 0; i < 10; i++) {
	  newTree.add(Math.floor(Math.random()*30));
	  pause(newTree);
	}
	return newTree;
}`,
themeIndex: 0,
theme: themes[0],
themeOptions: themes.length,
binary: false
}, action) => {
  let newIndex;
  switch (action.type) {
    case 'UPDATE_CODE':
      return { ...state, userCode: action.newCode };
    case 'TOGGLE_TREE_TYPE':
      return {
        ...state,
        userCode: state.altCode,
        altCode: state.userCode,
        binary: !state.binary
      };
    case 'DARKEN_THEME':
      newIndex = Math.max(0, state.themeIndex - 1)
      return {
        ...state, 
        themeIndex: newIndex,
        theme: themes[newIndex]
      };
    case 'LIGHTEN_THEME':
      newIndex = Math.min(state.themeOptions - 1, state.themeIndex + 1)
      return {
        ...state, 
        themeIndex: newIndex,
        theme: themes[newIndex]
      };
    default:
      return state;
  }
};

export default userCode;
