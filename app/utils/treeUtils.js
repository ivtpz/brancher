const countExpandedChildren = item => {
  if (
    !item.get('children') ||
    !item.get('children').size ||
    !item.get('expanded')
  ) {
    return 0;
  } else {
    const totOnPage = item.get('children').size;
    return totOnPage +
      item
        .get('children')
        .reduce((sum, child) => sum + countExpandedChildren(child), 0);
  }
};

const findNodePath = (path, state) => {
  let currArray = state;
  let currNode;
  const immutablePath = [];
  let ii = 0;
  const newPath = path.map((addr, i) => i ? addr - path[i - 1] - 1 : addr);
  // Iterate through path array
  for (let addr of newPath) {
    // Count children of each expanded item above current item
    // Grab current address in path array
    let index = findIndexInArray(addr, currArray);
    immutablePath.push(index);
    currNode = currArray.get(index);
    if (!currNode) {
      throw new Error('Bad Path, did not match state tree');
    }
    // Grab children of current address
    currArray = currArray.get(index).get('children');
    if (!currArray) {
      break;
    } else {
      ii++;
      if (ii < newPath.length) {
        immutablePath.push('children');
      }
    }
  }
  return immutablePath;
};

const findIndexInArray = (visibleLoc, currArray) => {
  let addr = visibleLoc;
  for (let i = 0; i < currArray.size && i < addr; i++) {
    if (currArray.get(i).get('expanded')) {
      let itemsOnPage = countExpandedChildren(currArray.get(i));
      addr -= itemsOnPage;
    }
  }
  return addr;
};

const replaceNodeWithChildren = (ii, list) => {
  let newList = list.delete(ii);
  list.get(ii).get('children').forEach((childToMoveUp, jj) => {
    newList = newList.insert(ii + jj, childToMoveUp);
  });
  return newList;
};

export default {
  countExpandedChildren,
  findNodePath,
  findIndexInArray,
  replaceNodeWithChildren
};
