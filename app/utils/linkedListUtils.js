import { List, Map } from 'immutable';

const findNodeIndex = (value, list) => {
  for (let i = 0; i < list.size; i++) {
    if (list.get(i).get('value') === value) {
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
      highlighted: false
    }));
    node = node.next;
  }
  return List(flatList);
};

const pause = (action, list) => action(flatten(list));

const highlight = node => node.value;

export default {
  findNodeIndex,
  pause,
  highlight,
  flatten
};
