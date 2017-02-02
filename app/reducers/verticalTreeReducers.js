import undoable from 'redux-undo-immutable';
import { fromJS } from 'immutable';
import { findPathByNodeId } from '../utils/vertTreeUtils';

const defaultState = fromJS([{ value: undefined, children: [], _id: 1000 }]);

const verticalTreeData = (
  state = defaultState,
  action
) => {
  let path = findPathByNodeId(action.nodeId, state);
  switch (action.type) {
    case 'UPDATE_VERT_STRUCTURE':
      return action.newState;
    case 'HIGHLIGHT_NODE':
      path.push('highlighted');
      return state.setIn(path, true);
    case 'UNHIGHLIGHT_NODE':
      path.push('highlighted');
      return state.setIn(path, false);
    case 'RESET_TO_DEFAULT':
      return defaultState;
    default:
      return state;
  }
};

const undoableVerticalTreeData = undoable(
  verticalTreeData,
  { limit: 20 }
);

export default {
  verticalTreeData: undoableVerticalTreeData,
  testableVerticalTreeData: verticalTreeData
};
