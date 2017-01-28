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
userCode: `function (tree, pause, highlight, augment) {
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
}`,
themeIndex: 0,
theme: themes[0],
themeOptions: themes.length
}, action) => {
  let newIndex;
  switch (action.type) {
    case 'UPDATE_CODE':
      return {...state, userCode: action.newCode };
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
