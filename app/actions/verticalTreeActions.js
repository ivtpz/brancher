const updateStructure = newState => {
  return { type: 'UPDATE_VERT_STRUCTURE', newState };
};

const updateCode = newCode => {
  return { type: 'UPDATE_CODE', newCode };
};

const highlightNode = (delay, unHighlight, nodeId) => {
  setTimeout(() => unHighlight(nodeId), delay / 1.1);
  return { type: 'HIGHLIGHT_NODE', nodeId };
};

const unHighlightNode = nodeId => {
  return { type: 'UNHIGHLIGHT_NODE', nodeId };
};

export default {
  updateStructure,
  updateCode,
  highlightNode,
  unHighlightNode
};
