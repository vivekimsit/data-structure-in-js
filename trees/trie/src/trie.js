/* The digital tree or the prefix tree implementation.
 * @link TODO: wiki link here
 * @license MIT
 * @author vivek
 */

var Trie = (function() {
  /**
  * @param {String} key Single character representing trie node.
  * @default ''
  *
  * @constructor
  */
  function Trie(key) {
    this.key         = key || '';
    this.children    = [];
    this.meta        = [];
    this.prefixCount = 0;
    this.wordCount   = 0;
  }

  Trie.prototype = {
    add: function(word, meta) {
      if (word) {
        var t,
            i = 0,
            c = this.children,
            l = c.length,
            key = word.charAt(0)

        meta = meta || {};
        if (!meta.word) {
          meta.word = word;
        }

        // key already present
        for (; i < l; i++) {
          if (key === c[i].key) {
            t = c[i];
            break;
          }
        }

        // if key not found, make a new trie node
        if (!t) {
          ++this.prefixCount;
          t = new Trie(key);
          c.push(t);
        }

        t.add(word.substring(1), meta);  // add the next key
      } else {  // end of the word
        // console.log('End of the key', meta);
        this.meta.push(meta);
        ++this.wordCount;
      }
    },

    find: function(key) {
      return walker(key, this, function(trie, idx) {
        return trie.children[idx];
      });
    },

    remove: function(key) {
      walker(key, this, function(trie, idx) {
        trie.children.remove(idx);
      });
    },

    update: function(keyOld, keyNew, meta) {
      this.remove(keyOld);
      this.add(keyNew, meta);
    },

    toString: function() {
      return '[Trie]' + '\n'
          + 'key: ' + this.key + '\n'
          + 'prefixCount: ' + this.prefixCount + '\n'
          + 'wordCount: ' + this.wordCount + '\n'
          + 'metadata: ' + JSON.stringify(this.meta) + '\n'
          + 'children: [Array] (' + this.children.length + ')';
    },

    sort: function() {
      /* TODO */
    },

    getWords: function() {
      var words = [],
          c     = this.children,
          i     = 0,
          l     = c.length;
      for (; i < l; ++i) {
        if (c[i].wordCount) {
          words = words.concat(c[i].meta.map(function(meta) {
            return meta.word;
          }));
        }

        words.concat(c[i].getWords());
      }

      return words;
    },

    getWordCount: function(word) {
      return walker(word, this, function(trie, idx) {
        return trie.children[idx].wordCount;
      });
    }
  }

  // Private methods here

  function walker(word, trie, callback/* on successful match */) {
    if (!word || !trie) return null;

    var ch, i, c, l, prev;

    while (word.length > 0) {
      ch = word.charAt(0);
      c  = trie.children;
      l  = c.length;
      i  = 0;
      for ( ;i < l; i++) {
        if (ch === c[i].key) break;
      }

      if (i == l) return null;

      prev = trie;
      word = word.substring(1);
      trie = c[i];
    }

    return callback(prev, i);
  }

  return Trie;
}());
