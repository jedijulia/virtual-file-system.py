function Node(value) {
    this.value = value;
    this.parent = null;
    this.children = [];

    // adds a node to the node's children
    this.add_child = function(child) {
        this.children.push(child);
    };

    // removes a node from the node's children
    this.remove = function(child) {
        var i = this.children.indexOf(child);
        this.children.splice(i, 1);
    }

    // accepts a value, returns an array of nodes
    this.search = function(to_search) {
        var found = [];
        if (this.value === to_search) {
            found.push(this);
        }
        for (var i=0; i < this.children.length; i++) {
            var child = this.children[i];
            found = found.concat(child.search(to_search));
        }
        return found;
    }

    // accepts a value, returns nodes that are direct children
    this.find = function(to_find) {
        for (var i=0; i < this.children.length; i++) {
            var child = this.children[i];
            if (child.value === to_find) {
                return child
            }
        }
        return null;
    }
}

function Tree(root) {
    this.root = root;

    // to_insert(value), parent(node/value)
    this.insert = function(to_insert, parent) {
        var to_insert_node = new Node(to_insert);
        if (parent instanceof Node) {
            parent.add_child(to_insert_node);
            to_insert_node.parent = parent;
        } else {
            var parent_node = this.search(parent)[0];
            parent_node.add_child(to_insert_node);
            to_insert_node.parent = parent_node;
        }
    }

    // tremove(node/value)
    this.remove = function(to_remove) {
        if (to_remove instanceof Node) {
            if (to_remove !== this.root) {
                var parent = to_remove.parent;
                parent.remove(to_remove); 
            } else {
                this.root = null;
            }
        } else {
            if (to_remove !== this.root.value) {
                var to_remove_nodes = this.search(to_remove);
                for (var i=0; i < to_remove_nodes.length; i++) {
                    var to_remove_node = to_remove_nodes[i];
                    var parent = to_remove_node.parent;
                    parent.remove(to_remove_node);
                }
            } else {
                this.root = null;
            }
        }
    }

    // tosearch(value), returns all the nodes
    this.search = function(to_search) {
        var found = this.root.search(to_search);
        return found;
    }

    this.display = function() {
        var queue = [];
        var tree_str = '';
        if (this.root !== null) {
            queue.push(this.root);
            while (queue.length !== 0) {
                var curr = queue.shift();
                tree_str += curr.value + ' ';
                for (var i=0; i < curr.children.length; i++) {
                    var child = curr.children[i];
                    queue.push(child);
                }
            }
            return tree_str;
        } else {
            return 'The tree is empty.';
        }
    }
}

// var root = new Node('7');
// var tree = new Tree(root);
// var root = tree.root;
// tree.insert('3', root);
// tree.insert('11', root);
// tree.insert('7', '3');
// tree.insert('5', '3');
// tree.insert('4', '5');
// tree.insert('10', '11');
// tree.insert('15', '11');
// tree.insert('8', '11');
// tree.insert('9', '15');
// tree.display();
// console.log('removal of 11');
// tree.remove('11');
// tree.display();