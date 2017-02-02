const updateStructure = newState => ({ type: 'UPDATE_VERT_STRUCTURE', newState });

const highlightNode = nodeId => (dispatch, getState) => {
  setTimeout(() => dispatch(unHighlightNode(nodeId)), getState().async.delay / 1.1);
  dispatch({ type: 'HIGHLIGHT_NODE', nodeId });
};

const unHighlightNode = nodeId => ({ type: 'UNHIGHLIGHT_NODE', nodeId });

const resetTree = () => ({ type: 'RESET_TO_DEFAULT' });

export default {
  updateStructure,
  highlightNode,
  unHighlightNode,
  resetTree
};
