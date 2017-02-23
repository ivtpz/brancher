import { findNodeIndex } from '../utils/linkedListUtils';

const updateStructure = newState => {
  return { type: 'UPDATE_LIST_STRUCTURE', newState };
};

const highlightNode = nodeValue => (dispatch, getState) => {
  const stateList = getState().linkedListData.present;
  const nodeIndex = findNodeIndex(nodeValue, stateList);
  setTimeout(() => dispatch(unHighlightNode(nodeIndex)), getState().async.delay / 1.1);
  dispatch({ type: 'HIGHLIGHT_NODE', nodeIndex });
};

const unHighlightNode = nodeIndex => ({ type: 'UNHIGHLIGHT_NODE', nodeIndex });

const resetList = () => ({ type: 'RESET_TO_DEFAULT' });

export default {
  updateStructure,
  highlightNode,
  unHighlightNode,
  resetList
};
