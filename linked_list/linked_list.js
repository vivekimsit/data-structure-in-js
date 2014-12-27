/**
 * Linked List implementation in JS.
 * @class LinkedList
 * @constructor
 */
function LinkedList() {

  /**
   * The number of items in the list.
   * @property _length
   * @type {Number}
   * @private
   */
  this._length = 0;

  /**
   * Pointer to the first item in the list.
   * @property _head
   * @type {?Object}
   * @private
   */
  this._head = null;
}

// LinkedList interface
LinkedList.prototype = {

  constructor: LinkedList,

  /**
   * Appends the data at the end of the list.
   * @param {?Object} The data item to add.
   * @return {undefined}
   */
  add: function(data) {
    var node = {
      data: data,
      next: null
    }, current;

    // List empty
    if (this._head === null) {
      this._head = node;
    } else {
      current = this._head;

      while(current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this._length++;
  },

  /**
   * Finds the list item from the given index.
   * @param {number} The zero based index.
   * @return {?Object} The data at the given index.
   */
  item: function(index) {
    if (index > -1 && index < this._length) {
      var current = this._head, i = 0;

      while (i++ < index){
        current = current.next;
      }
      return current.data;
    } else {
      return null;
    }
  },

  /**
   * Removes the list item from the given index.
   * @param {number} The zero based index.
   * @return {?Object} The data at the given index.
   */
  remove: function(index) {
    if (index > -1 && index < this._length) {
      var current = this._head,
        previous,
        i = 0;

      // Special case, first item
      if (index === 0) {
        this._head = current.next;
      } else {
        while (i++ < index) {
          previous = current;
          current  = current.next;
        }

        // Delete the item
        previous.next = current.next;
      }

      this._length--;
      return current.data;
    } else {
      return null;
    }
  },

  /**
   * Returns the number of items in the list.
   * @return {number} The number of items in the list.
   */
  size: function() {
    return this._length;
  },

  /**
   * Converts the list into an array.
   * @return {Array} An array representation of the list.
   */
  toArray: function() {
    var result  = [],
        current = this._head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  },

  /**
   * Converts the list into the string representation.
   * @return {string} String representation of the list.
   */
  toString: function() {
    return this.toArray().toString();
  }
}
