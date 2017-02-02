/* eslint-disable */
function AVLCreator(pause, highlight) {
class AVLTree {
  constructor(value) {
    this.root = new Node(value);
  }
  add(value) {
    if (!this.root || this.root.value === null || this.root.value === undefined) {
      this.root = new Node(value);
      pause(this.root);
    }
    else {
      this.root.add(value, this.root);
    }
  }
  remove(value) {
    const current = this.root;
    const parents = [];
    let replacementParent, replacement, childCount, parent;
    childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
    if (current.value === value){
      switch(childCount){
        case 0:
          this.root.value = null;
          pause(this.root);
          break;
        case 1:
          replacement = (current.right === null ? current.left : current.right);
          highlight(this.root);
          highlight(replacement);
          this.root = replacement;
          pause(this.root);
          break;
        case 2:
          replacement = this.root.left;
          while (replacement.right) {
            if (replacementParent) parents.push(replacementParent);
            replacementParent = replacement;
            replacement = replacement.right;
          }
          highlight(this.root);
          highlight(replacement);
          if (replacementParent) {
            replacementParent.right = replacement.left;
            replacementParent.updateInNewLocation();
            pause(this.root);
            this.root = replacement;
            this.root.right = current.right;
            this.root.left = current.left;
            pause(this.root);
            while(parents.length) {
              parent = parents.pop();
              parent.updateInNewLocation();
              parent.balance(this.root);
            }
          } else {
            this.root = replacement;
            this.root.right = current.right;
          }
          this.root.updateInNewLocation();
          this.root.balance(this.root);
          pause(this.root);
          break;
      }
    } else {
      this.root.remove(value, this.root);
    }
  }
  find(value) {
    return this.root.contains(value);
  }
}

class Node {
  constructor(value=null, left=null, right=null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this._id = Math.floor(Math.random()*1000);
  }
  add(value, root) {
    if (value > this.value) {
      this.right ? this.right.add(value, root) : this.right = new Node(value);
      if (!this.left || this.right.height > this.left.height) {
        this.height = this.right.height + 1;
      } 
    } else if (value < this.value){
      this.left ? this.left.add(value, root) : this.left = new Node(value);
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1;
      }
    }
    pause(root);
    this.balance(root);
  }
  traverse(cb) {
    cb(this);
    if (this.left) this.left.traverse(cb);
    if (this.right) this.right.traverse(cb);
  }
  contains(value) {
    console.log(this, value)
    highlight(this);
    if (this.value === value) {
      return true;
    } else {
      if (value < this.value) {
        if (!this.left) return false;
        return this.left.contains(value);
      } else {
        if (!this.right) return false;
        return this.right.contains(value);
      }
    }
  }
  remove(value, root) {
    var found           = false,
      parent            = null,
      current           = this,
      alteredParents    = [],
      subAlteredParents = [],
      childCount,
      replacement,
      replacementParent,
      alteredParent,
      subAlteredParent;
    while(!found && current) {
      alteredParents.push(current);
      if (value < current.value) {
        parent = current;
        current = current.left;
      } else if (value > current.value) {
        parent = current;
        current = current.right;
      } else {
        found = true;
      }
    }
    alteredParents.pop();
    if (found) {
      childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
      switch (childCount){
        case 0:
          // highlight(current);
          if (current.value < parent.value) {
            parent.left = null;
          } else {
            parent.right = null;
          }
          pause(root)
          break;
        case 1:
          highlight(current);
          current.left ? highlight(current.left) : highlight(current.right);
          if (current.value < parent.value){
            parent.left = (current.left === null ? 
            current.right : current.left);
            //if the current value is greater than its 
            //parent's, reset the right pointer
          } else {
            parent.right = (current.left === null ? 
            current.right : current.left);
          }
          pause(root)
          break;
        //two children, a bit more complicated
        case 2:
          //reset pointers for new traversal
          replacement = current.left;
          replacementParent = current;
          //find the right-most node
          while(replacement.right){
            subAlteredParents.push(replacement);
            replacementParent = replacement;
            replacement = replacement.right;
          }
          highlight(current);
          highlight(replacement)
          if (replacementParent !== current){
            replacementParent.right = replacement.left;
          } else {
            current.left = replacement.left;
          }

          //assign children to the replacement
          replacement.right = current.right;
          replacement.left = current.left;

          //place the replacement in the right spot
          if (current.value < parent.value){
            parent.left = replacement;
          } else {
            parent.right = replacement;
          }
          pause(root)
          while (subAlteredParents.length) {
            subAlteredParent = subAlteredParents.pop();
            subAlteredParent.updateInNewLocation();
            subAlteredParent.balance();
          }
          replacement.updateInNewLocation();
          replacement.balance(root);
          break;
          //no default
      }
      
      while (alteredParents.length) {
        alteredParent = alteredParents.pop();
        alteredParent.updateInNewLocation();
        alteredParent.balance(root);
      }
    }
  }
  balance(root) {
    const rightHeight = (this.right) ? this.right.height : 0;
    const leftHeight = (this.left) ? this.left.height : 0;
    
    if ( leftHeight > rightHeight + 1 ) {
      const leftRightHeight = (this.left.right) ? this.left.right.height : 0;
      const leftLeftHeight = (this.left.left) ? this.left.left.height : 0;
      
      if (leftRightHeight > leftLeftHeight) {
        this.left.rotateRR(root);
      }
      
      this.rotateLL(root);
    }
    else if ( rightHeight > leftHeight + 1 ) {
      const rightRightHeight = (this.right.right) ? this.right.right.height : 0;
      const rightLeftHeight = (this.right.left) ? this.right.left.height : 0;
      
      if (rightLeftHeight > rightRightHeight) {
        this.right.rotateLL(root);
      }
      
      this.rotateRR(root);
    }
  }
  rotateRR(root) {
    if (this._id) {
      highlight(this);
      highlight(this.right);
    }
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.right.value = valueBefore;
    pause(root)
    this.left = this.right;
    this.right = this.right.right;
    pause(root)
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    pause(root)
    //this.left.value = valueBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
    pause(root)
  }
  rotateLL(root) {
    if(this._id) {
      highlight(this);
      highlight(this.left);
    }
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.left.value = valueBefore;
    pause(root)
    this.right = this.left;
    this.left = this.left.left;
    pause(root)
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    pause(root)
    //this.right.value = valueBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
    pause(root)
  }
  updateInNewLocation() {
    if (!this.right && !this.left) {
      this.height = 1;
    }
    else if (!this.right || (this.left && this.right.height < this.left.height)) {
      this.height = this.left.height + 1;
    }
    else { //if (!this.left || this.right.height > this.left.height)
      this.height = this.right.height + 1;
    }
  }
}
return AVLTree;
}
export default {
  AVLCreator
}