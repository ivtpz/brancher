import { List, Map } from 'immutable';

const findNodeIndex = (value, list, prop) => {
  for (let i = 0; i < list.size; i++) {
    if (list && typeof list === 'object' && list.get(i).get(prop) === value) {
      return i;
    }
  }
  return -1;
};

const flatten = list => {
  let flatList = [];
  let node = list.head;
  while (node) {
    flatList.push(Map({
      value: node.value,
      _id: node._id,
      highlighted: false
    }));
    node = node.next;
  }
  return List(flatList);
};

const pause = (action, list) => action(flatten(list));

const highlight = (action, node) => Number.isInteger(node._id) ?
  action(null, node._id) : action(node.value, null);

export default {
  findNodeIndex,
  pause,
  highlight,
  flatten
};
