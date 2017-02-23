import undoable from 'redux-undo-immutable';
import { List, Map } from 'immutable';

const defaultState = List([Map({ value: 1, _id: 1000 })]);

const linkedListData = (
  state = defaultState,
  action
) => {
  let index = action.nodeIndex;
  let path = [index];
  if (Number.isInteger(index) && index !== -1) {
    path.push('highlighted');
  }
  switch (action.type) {
    case 'UPDATE_LIST_STRUCTURE':
      return action.newState;
    case 'HIGHLIGHT_NODE':
      return path ? state.setIn(path, true) : state;
    case 'UNHIGHLIGHT_NODE':
      return path ? state.setIn(path, false) : state;
    case 'RESET_TO_DEFAULT':
      return defaultState;
    default:
      return state;
  }
};

const undoableLinkedListData = undoable(
  linkedListData,
  { limit: 20 }
);

export default {
  linkedListData: undoableLinkedListData,
  testableLinkedListData: linkedListData
};
