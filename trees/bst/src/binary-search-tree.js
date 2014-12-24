/* http://www.nczonline.net/blog/2009/06/09/computer-science-in-javascript-binary-search-tree-part-1/ */


/**
 * @param {Object} node The new node
 * @constructor
 */
function BinarySearchTree() {
  this._root = null;
}

// BST interface
BinarySearchTree.prototype = {

  //restore constructor
  constructor: BinarySearchTree,

  add: function(value) {

    if (!value) {
      return false;
    }

    var node = {
      value: value,
      left: null,
      right: null
    },
    current;

    // no node, empty tree
    if (this._root === null) {
      this._root = node;
    } else {
      current = this._root;
      while (true) {
        // move left
        if (value < current.value) {
          if (current.left === null) {
            current.left = node;
            break;
          } else {
            current = current.left;
          }
        }
        // move right
        else if (value > current.value) {
          if (current.right === null) {
            current.right = node;
            break;
          } else {
            current = current.right;
          }
        }
        // value already there (duplicates aren't allowed), return
        else {
          break;
        }
      }
    }
  },

  size: function() {
    var length = 0;

    this.traverse(function(node) {
      length++;
    });

    return length;
  },

  remove: function(value) {
    var found   = false,
        current = this._root,
        parent  = null,
        childCount,
        replacement,
        replacementParent;
    // Find node
    while (!found && current) {
      if (value < current.value) {
        parent  = current;
        current = current.left;
      } else if (value > current.value) {
        parent  = current;
        current = current.right;
      } else {
        found = true;
      }
    }

    if (found) {
      childCount = (current.left !== null ? 1 : 0) +
          (current.right !== null ? 1 : 0);
      if (current === this._root) {
      // No child
      // One child
      // Two children
        switch (childCount) {
          case 0:
            this._root = null;
            break;
          case 1:
            this._root = (current.left === null ? current.right : current.left);
            break;
          case 2:
            replacement = this._root.left;
            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }

            if (replacementParent !== null) {
              replacementParent.right = replacement.left;
              replacement.right = this._root.right;
              replacement.left = this._root.left;
            } else {
              replacement.right = this._root.right;
            }

            this._root = replacement;
        }
      }
      // Not root node
      else {
        switch (childCount) {
          case 0:
            if (current.value < parent.value) {
              parent.left = null;
            } else {
              parent.right = null;
            }
            break;
          case 1:
            if (current.value < parent.value) {
              parent.left = (current.left === null ?
                  current.right : current.left);
            } else {
              parent.right = (current.left === null ?
                  current.right : current.left);
            }
            break;
          case 2:
            replacement = current.left;
            replacementParent = current;
            while (replacement.right !== null) {
              replacementParent = replacement;
              replacement = replacement.right;
            }
            replacementParent.right = replacement.left;

            replacement.right = current.right;
            replacement.left = current.left;

            if (current.value < parent.value) {
              parent.left = replacement;
            } else {
              parent.right = replacement;
            }
        }
      }
    }
    // non root
  },

  traverse: function(process) {
    function inOrder(node) {
      // O(n) because it needs to visit each node once
      if (node) {
        // traverse left
        if (node.left !== null) {
          inOrder(node.left);
        }
        // process current
        process.call(this, node);
        // traverse right
        if (node.right !== null) {
          inOrder(node.right);
        }
      }
    }

    function preOrder(node) {
      if (node) {
        // process node
        process.call(this, node);
        // traverse left
        if (node.left !== null) {
          inOrder(node.left);
        }
        // traverse right
        if (node.right !== null) {
          inOrder(node.right);
        }
      }
    }

    function postOrder(node) {
      if (node) {
        // traverse left
        if (node.left !== null) {
          inOrder(node.left);
        }
        // traverse right
        if (node.right !== null) {
          inOrder(node.right);
        }
        // process node
        process.call(this, node);
      }
    }

    return inOrder(this._root);
    //return preOrder(this._root);
    //return postOrder(this._root);
  },

  contains: function(value) {
    var found   = false,
        current = this._root;
    while (!found && current !== null) {
      // value is less, go left
      if (value < current.value) {
        current = current.left;
      }
      // value is more, go right
      else if (value > current.value) {
        current = current.right;
      }
      // value found
      else {
        found = true;
      }
    }
    return found;
  },

  toArray: function() {
    var result = [];

    this.traverse(function(node) {
      result.push(node.value);
    });

    return result;
  },

  toString: function() {
    return this.toArray().toString();
  }
};

var seed = [1, 3, 4, 6, 7, 8, 10, 13, 14];
var bst = new BinarySearchTree();
for (var i = 0, len = seed.length; i < seed.length; i++) {
  bst.add(seed[i]);
}

/* console.log(bst.toString());
console.log(bst.contains(14));
//console.log(bst.toArray());
console.log(bst.remove(14));
console.log(bst.contains(14));
*/
