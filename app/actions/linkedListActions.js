import { findNodeIndex } from '../utils/linkedListUtils';

const updateStructure = newState => {
  return { type: 'UPDATE_LIST_STRUCTURE', newState };
};

const highlightNode = (nodeValue, nodeId) => (dispatch, getState) => {
  const stateList = getState().linkedListData.present;
  const searchProp = Number.isInteger(nodeValue) ? 'value' : '_id';
  const searchValue = Number.isInteger(nodeValue) ? nodeValue : nodeId;
  const nodeIndex = findNodeIndex(searchValue, stateList, searchProp);
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
