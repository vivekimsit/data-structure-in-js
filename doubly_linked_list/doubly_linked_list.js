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
   * Pointer to first item in the list.
   * @property _head
   * @type {?Object}
   * @private
   */
  this._head = null;

  /**
   * Pointer to last item in the list.
   * @property _head
   * @type {?Object}
   * @private
   */
  this._tail = null;
}

// Public interface for the client.
LinkedList.prototype = {

  /**
   * Appends the data at the end of the list.
   * @param {?Object} The data item to add.
   * @return {undefined}
   */
  add: function(data) {
    var node = {
      data: data,
      next: null,
      prev: null
    };

    if (this._length === 0) {
      this._head = this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
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
      var current = this._head,
          i = 0;

      while (i++ < index) {
        current = current.next;
      }

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
   * Removes the list item from the given index.
   * @param {number} The zero based index.
   * @return {?Object} The data at the given index.
   */
  remove: function(index) {
    if (index > -1 && index < this._length) {
      var current = this._head,
          i = 0;

      // removing first item
      if (index === 0) {
        this._head = current.next;

        // If there is only a single item
        if (!this._head) {
          this._tail = null;
        } else {
          this._head.prev = null;
        }
      // removing last item
      } else if (index === this._length) {
        current = this._tail;
        this._tail = current.prev;
        this._tail.next = null;
      } else {
        var i = 0;

        while(i++ < index) {
          current = current.next;
        }

        current.prev.next = current.next;
        current.next.prev = current.prev;
      }

      // decrement the length
      this._length--;

      //return the value
      return current.data;
    } else {
      return null;
    }
  },

  /**
   * Converts the list into an array.
   * @return {Array} An array representation of the list.
   */
  toArray: function() {
    var result = [],
        current = this._head;
    while(current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  },

  toString: function() {
    return this.toArray().toString();
  }
}
