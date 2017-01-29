import { List, Map } from 'immutable';

class Node {
  constructor(value, id) {
    this.value = value;
    this.children = [];
    this._id = id || Math.floor(Math.random() * 10000);
  }
  _add(value, index, id) {
    this.children[index] = new Node(value, id);
  }
}

const flatten = nestedObjList => {
  let container = List([ List([ nestedObjList ]) ]);
  let children = true;
  const emptyNode = Map({ value: undefined, children: List([]) });
  while (children) {
    children = false;
    const level = [];
    container.get(container.size - 1).forEach(childSection => {
      childSection.forEach(node => {
        if (node && node.get('children').size) {
          children = true;
          level.push(node.get('children'));
        } else {
          level.push(List([ emptyNode ]));
        }
      });
    });
    if (children) {
      container = container.push(List(level));
    }
  }
  return container.map(
    level =>
      level.map(
        section =>
          section.size ?
          section.map(node => {
            return node.get('value') !== undefined ?
            [node.get('value'), node.get('highlighted') || false]
            : undefined;
          })
          : section
      )
  );
};

const mapConnections = treeArray => {
  const connections = {};
  let rowIndex;
  let nodeId;
  let childId;
  treeArray.forEach((level, levelIndex) => {
    rowIndex = 0;
    level.forEach((section, sectionIndex) => {
      section.forEach((_, nodeIndex) => {
        if (levelIndex < treeArray.length - 1) {
          nodeId = `${levelIndex}-${sectionIndex}-${nodeIndex}`;
          connections[nodeId] = [];
          treeArray[levelIndex + 1][rowIndex]
          .forEach((child, id) => {
            // Ignore undefined (empty values for binary trees)
            if (child) {
              childId = `${levelIndex + 1}-${rowIndex}-${id}`;
              connections[nodeId].push(childId);
            }
          });
        }
        rowIndex++;
      });
    });
  });
  return connections;
};

const convertToImmutable = tree => {
  let immutableTree = [];
  if (!tree.length) {
    return List(immutableTree);
  }
  for (let node of tree) {
    let newNode = { ...node };
    newNode.children = convertToImmutable(newNode.children);
    let mappedNode = Map(newNode);
    immutableTree.push(mappedNode);
  }
  return List(immutableTree);
};

const convertFromBinary = (tree, newTree = new Node(tree.value)) => {
  if (tree.left) {
    newTree._add(tree.left.value, 0, tree.left._id);
    convertFromBinary(tree.left, newTree.children[0]);
    if (!tree.right) {
      newTree._add(undefined, 1);
    }
  }
  if (tree.right) {
    newTree._add(tree.right.value, 1, tree.right._id);
    convertFromBinary(tree.right, newTree.children[1]);
    if (!tree.left) {
      newTree._add(undefined, 0);
    }
  }
  return newTree;
};

const addIds = tree => {
  const { value, _id } = tree;
  const treeCopy = typeof _id === 'number' ? new Node(value, _id) : new Node(value);
  tree.children.forEach(child => {
    let idChild = addIds(child);
    treeCopy.children.push(idChild);
  });
  return treeCopy;
};

const pause = (action, tree) => {
  let stateTree;
  if (tree.hasOwnProperty('left') && tree.hasOwnProperty('right')) {
    stateTree = convertFromBinary(tree);
  } else {
    stateTree = addIds(tree);
  }
  action(convertToImmutable([ stateTree ]));
};

const highlight = (action, node) => {
  if (node.hasOwnProperty('_id')) {
    action(node._id);
  } else {
    alert('You can only pass pre-existing nodes to highlight, not newly created nodes.');
  }
};

const augment = (tree, UserClass, addFn) => {
  let testNode = new UserClass(1);
  if (!testNode.hasOwnProperty('value' || testNode.value !== 1)) {
    alert('Constructor must accept a value, and assign it to key "value" on returned object');
    return;
  }
  // TODO: add more validation tests on userClass
  if (testNode.hasOwnProperty('left') && testNode.hasOwnProperty('right')) {
    return extendBinaryNode(tree, UserClass, addFn);
  } else {
    return extendNode(tree, UserClass, addFn);
  }
};

const extendNode = (node, UC, addFn = 'add', extendedTree) => {
  extendedTree = extendedTree || new UC(node.value); // eslint-disable-line
  extendedTree._id = node._id; // eslint-disable-line
  node.children.forEach((child, i) => {
    extendedTree[addFn](child.value);
    extendNode(child, UC, addFn, extendedTree.children[i]);
  });
  return extendedTree;
};

const extendBinaryNode = (node, UC, addFn = 'add', extendedTree) => {
  extendedTree = extendedTree || new UC(node.value); // eslint-disable-line
  extendedTree._id = node._id; // eslint-disable-line
  if (node.children.length) {
    if (node.children[0] && node.children[0].value !== undefined) {
      extendedTree[addFn](node.children[0].value);
      extendBinaryNode(node.children[0], UC, addFn, extendedTree.left);
    }
    if (node.children[1] && node.children[1].value !== undefined) {
      extendedTree[addFn](node.children[1].value);
      extendBinaryNode(node.children[1], UC, addFn, extendedTree.right);
    }
  }
  return extendedTree;
};

const findPathByNodeId = (id, tree) => {
  let immutablePath;
  (function traverse(treeList, currPath = []) {
    for (let i = 0; i < treeList.size; i++) {
      if (treeList.get(i).get('_id') === id) {
        immutablePath = currPath.concat([i]);
      } else {
        traverse(treeList.get(i).get('children'), currPath.concat([i, 'children']));
      }
    }
  })(tree);
  return immutablePath;
};

export default {
  flatten,
  convertToImmutable,
  pause,
  convertFromBinary,
  mapConnections,
  addIds,
  highlight,
  findPathByNodeId,
  augment
};
