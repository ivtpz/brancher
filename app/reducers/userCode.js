import treeCode from '../starterCode/tree';
import binaryCode from '../starterCode/binaryTree';
import linkedListCode from '../starterCode/linkedList';

const themes = [
  'monokai',
  'tomorrow_night_eighties',
  'tomorrow_night_blue',
  'kuroir',
  'katzenmilch',
  'chrome'
];

const userCode = (state = {
  userCode: treeCode,
  treeCode,
  binaryCode,
  linkedListCode,
  themeIndex: 0,
  theme: themes[0],
  themeOptions: themes.length,
  binary: false,
  aceErrors: []
}, action) => {
  let newIndex;
  switch (action.type) {
    case 'UPDATE_CODE':
      return { ...state, userCode: action.newCode };
    case 'UPDATE_TREE_CODE':
      return { ...state, treeCode: action.newCode };
    case 'UPDATE_BINARY_CODE':
      return { ...state, BinaryCode: action.newCode };
    case 'UPDATE_LINKED_LIST_CODE':
      return { ...state, linkedListCode: action.newCode };
    case 'TOGGLE_TREE_TYPE':
      return {
        ...state,
        userCode: state.binaryCode,
        binaryCode: state.userCode,
        binary: !state.binary
      };
    case 'SET_USER_ERROR':
      return { ...state, aceErrors: [action.aceError] };
    case 'DARKEN_THEME':
      newIndex = Math.max(0, state.themeIndex - 1);
      return {
        ...state,
        themeIndex: newIndex,
        theme: themes[newIndex]
      };
    case 'LIGHTEN_THEME':
      newIndex = Math.min(state.themeOptions - 1, state.themeIndex + 1);
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
