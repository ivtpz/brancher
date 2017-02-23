const updateCode = newCode => {
  return { type: 'UPDATE_CODE', newCode };
};

const updateTreeCode = newCode => {
  return { type: 'UPDATE_TREE_CODE', newCode };
};

const updateBinaryCode = newCode => {
  return { type: 'UPDATE_BINARY_CODE', newCode };
};

const updateLinkedListCode = newCode => {
  return { type: 'UPDATE_LINKED_LIST_CODE', newCode };
};

const swapCode = () => {
  return { type: 'TOGGLE_TREE_TYPE' };
};

const darken = () => {
  return { type: 'DARKEN_THEME' };
};

const lighten = () => {
  return { type: 'LIGHTEN_THEME' };
};

export default {
  updateCode,
  updateTreeCode,
  updateBinaryCode,
  updateLinkedListCode,
  darken,
  lighten,
  swapCode
};
