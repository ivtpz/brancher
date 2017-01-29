/* eslint-disable */
// Binary Tree with working removal
function BiTree (tree, pause, highlight, augment) {		
		class Node {
	    constructor(value) {
	      this.value = value;
	      this.left = null;
	      this.right = null;
	    }
	    add(value) {
	      if (value > this.value) {
	        this.right ? this.right.add(value) : this.right = new Node(value);
	      } else if (value < this.value){
	        this.left ? this.left.add(value) : this.left = new Node(value);
	      }
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
	  }
	  
		let extendedTree = augment(tree, Node);
		extendedTree.remove(12)
		
		let newTree = new Node(150);
		for (var i = 0; i < 30; i++) {
		  newTree.add(Math.floor(Math.random()*300));
		}
		return newTree;
	}