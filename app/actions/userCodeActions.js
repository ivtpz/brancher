const updateCode = newCode => {
  return { type: 'UPDATE_CODE', newCode };
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
  darken,
  lighten,
  swapCode
};