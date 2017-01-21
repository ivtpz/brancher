import undoable from 'redux-undo-immutable';
import { fromJS } from 'immutable';
import { findPathByNodeId } from '../utils/vertTreeUtils';

const verticalTreeData = (
  state = fromJS([
    {
      value: 'Root',
      children: [
        { value: 'child', children: [], _id: 2000 },
        { value: 'child2', children: [ { value: 'grandchild', children: [], _id: 3000 } ], _id: 4000 }
      ],
      _id: 1000
    }
  ]),
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
    default:
      return state;
  }
};

const undoableVerticalTreeData = undoable(verticalTreeData, {
  limit: 20
});

export default {
  verticalTreeData: undoableVerticalTreeData,
  testableVerticalTreeData: verticalTreeData
};
