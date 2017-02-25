const windowReducers = (state = {
  width: window.innerWidth,
  height: window.innerHeight
}, action) => {
  switch (action.type) {
    case 'UPDATE_WIDTH':
      return { ...state, width: action.newWidth };
    case 'UPDATE_HEIGHT':
      return { ...state, height: action.newHeight };
    default:
      return state;
  }
};

export default windowReducers;
