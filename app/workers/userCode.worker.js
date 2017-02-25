import loopProtect from '../utils/loop-protect';

const generateError = (errorRow, errorCol, text) => postMessage({
  type: 'error',
  message: {
    errorRow,
    errorCol,
    text
  }
});

loopProtect.hit = (line) => generateError(line, 0, 'Looks like you have an infinite loop around line ' + line);

loopProtect.method = 'loopProtect.protect';



const checkForValidObj = (userObj) => {
  const { name } = userObj.constructor
  if (typeof userObj === 'object' && (name === 'List' || name === 'Node')) {
    let success = {
      type: 'pause',
      message: userObj
    };
    if (name === 'List') {
      if (userObj.hasOwnProperty('head') && userObj.hasOwnProperty('tail')) {
        if (userObj.head && userObj.head.hasOwnProperty('value') && userObj.head.hasOwnProperty('_id')) {
          postMessage(success);
        } else {
          generateError(0, 0, 'Your Nodes must have "value" and "_id" properties');
        }
      } else {
        generateError(0, 0, 'Your list class must have \nproperties "head" and "tail"')
      }
    } else {
      if (userObj.hasOwnProperty('value') && userObj.hasOwnProperty('_id')) {
        postMessage(success);
      } else {
        generateError(0, 0, 'Nodes must have "value" and "_id" properties')
      }
    }
  } else {
    generateError(0, 0, 'Either you did not pass an object to the \nvisualizer, or your class name is invalid');
  }
}

const checkForValidNode = (userNode) => {
  if (typeof userNode === 'object' && userNode.hasOwnProperty('value')) {
    postMessage({
      type: 'highlight',
      message: userNode
    });
  } else {
    generateError(0, 0, 'You did not pass a valid node to the highlight function');
  }
}

const insertLoopProtection = code => {
  let insertIndex = code.indexOf(')');
  // Add the loopProtect function to the userCode scope
  return code.slice(0, insertIndex) + ', loopProtect' + code.slice(insertIndex);
};

onmessage = function(e) {
  let codeWithLoopProtection = insertLoopProtection(e.data);
  let loopProtectedCode = loopProtect.rewriteLoops(codeWithLoopProtection);
  try {
    let finalObj = eval(`(${loopProtectedCode})`)(checkForValidObj, checkForValidNode, loopProtect);
    checkForValidObj(finalObj);
  } catch (e) {
    let errorInfo = e.stack.split('\n');
    let errorLoc = errorInfo[1]
      .split(':')
      .slice(-2)
      .map(numString => numString.replace(/[\)]/g, ''))
    generateError(...errorLoc, errorInfo[0]);
  }
}
