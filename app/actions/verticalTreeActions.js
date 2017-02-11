import { findNodeIdByValue } from '../utils/vertTreeUtils';

const updateStructure = newState => ({ type: 'UPDATE_VERT_STRUCTURE', newState });

const highlightNode = (nodeId, nodeValue) => (dispatch, getState) => {
  const Id = nodeId || findNodeIdByValue(nodeValue, getState().verticalTreeData.present.get(0));
  setTimeout(() => dispatch(unHighlightNode(Id)), getState().async.delay / 1.1);
  dispatch({ type: 'HIGHLIGHT_NODE', nodeId: Id });
};

const unHighlightNode = nodeId => ({ type: 'UNHIGHLIGHT_NODE', nodeId });

const resetTree = () => ({ type: 'RESET_TO_DEFAULT' });

export default {
  updateStructure,
  highlightNode,
  unHighlightNode,
  resetTree
};
