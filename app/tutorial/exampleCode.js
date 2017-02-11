/* eslint-disable */
// AVL Tree with working removal
function BiTree (tree, pause, highlight, augment) {
		class Node {
	    constructor(value=null, left=null, right=null) {
	      this.value = value;
	      this.left = null;
	      this.right = null;
        this.height = 1;
	    }
	    add(value) {
	      if (value > this.value) {
	        this.right ? this.right.add(value) : this.right = new Node(value);
          if (!this.left || this.right.height > this.left.height) {
            this.height = this.right.height + 1;
          }
        } else if (value < this.value){
	        this.left ? this.left.add(value) : this.left = new Node(value);
          if (!this.right || this.right.height < this.left.height) {
            this.height = this.left.height + 1;
          }
        }
        this.balance();
	    }
	    traverse(cb) {
	      cb(this);
	      if (this.left) this.left.traverse(cb);
	      if (this.right) this.right.traverse(cb);
	    }
	    contains(value) {
	     highlight(this)
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
	    replaceRoot(newRoot) {
	      this.value = newRoot.value;
	      this.left = newRoot.left;
	      this.right = newRoot.right;
	    }
	    remove(value) {
        var found    = false,
          parent     = null,
          current    = this,
          root       = this,
          childCount,
          replacement,
          replacementParent;
        while(!found && current) {
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
	      if (found) {
	        childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
	        if (current === root){
            switch(childCount){
              case 0:
                this.value = null;
                break;
              case 1:
                replacement = (current.right === null ? current.left : current.right);
                highlight(this);
                highlight(replacement);
                this.replaceRoot(replacement);
                break;
              case 2:
                replacement = this.left;
                while (replacement.right) {
                  replacementParent = replacement;
                  replacement = replacement.right;
                }
                highlight(this);
                highlight(replacement);
                if (replacementParent) {
                  replacementParent.right = replacement.left;
                  this.value = replacement.value;
                } else {
                  this.left = replacement.left;
                  this.value = replacement.value;
                }
                break;
            }
	        } else {
	          switch (childCount){
	            case 0:
	              highlight(current);
	              if (current.value < parent.value) {
	                parent.left = null;
	              } else {
	                parent.right = null;
	              }
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
	              break;
              //two children, a bit more complicated
              case 2:
                //reset pointers for new traversal
                replacement = current.left;
                replacementParent = current;
                //find the right-most node
                while(replacement.right){
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
                break;
                //no default
	          }
	        }
	      }
	    }
  balance() {
    let tree = this;
    const rightHeight = (this.right) ? this.right.height : 0;
    const leftHeight = (this.left) ? this.left.height : 0;

    if ( leftHeight > rightHeight + 1 ) {
      const leftRightHeight = (this.left.right) ? this.left.right.height : 0;
      const leftLeftHeight = (this.left.left) ? this.left.left.height : 0;

      if (leftRightHeight > leftLeftHeight) {
        this.left.rotateRR();
      }

      this.rotateLL();
    }
    else if ( rightHeight > leftHeight + 1 ) {
      const rightRightHeight = (this.right.right) ? this.right.right.height : 0;
      const rightLeftHeight = (this.right.left) ? this.right.left.height : 0;

      if (rightLeftHeight > rightRightHeight) {
        this.right.rotateLL();
      }

      this.rotateRR();
    }
  }
  rotateRR() {
    if (this._id) highlight(this);
    if(this.left && this.left._id) highlight(this.left)
    if(this.right && this.right._id) highlight(this.right)
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
  }
  rotateLL() {
    if(this._id) highlight(this)
    if(this.right && this.right._id) highlight(this.right)
    if(this.left && this.left._id) highlight(this.left)
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
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

		let extendedTree = augment(tree, Node);
		//extendedTree.add(Math.floor(Math.random()*300))
		//extendedTree.remove(12)

		let newTree = new Node(150);
		for (var i = 0; i < 15; i++) {
		  newTree.add(Math.floor(Math.random()*300));
		  //pause(newTree)
		}
		return newTree;
	}
