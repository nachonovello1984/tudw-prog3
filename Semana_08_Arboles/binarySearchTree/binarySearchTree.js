import { Compare, defaultCompare } from '../utils.js';
import { Node } from './node.js';
import { LinkedQueue } from '../../Semana_02-ColeccionesLineales/queues/linkedQueue.js'

class BinarySearchTree {

    #compareFn;
    #root;

    constructor(compareFn = defaultCompare) {
        this.#compareFn = compareFn;  // Usado para comparar los elementos de los nodos.
        this.#root = null;
    }

    isEmpty() {
        return this.#root == null;
    }

    insert(key) {
        if (this.isEmpty()) {
            this.#root = new Node(key);
        } else {
            this.#insertNode(this.#root, key);
        }
    }

    min() {
        return this.#minNode(this.#root);
    }

    max() {
        return this.#maxNode(this.#root);
    }

    search(key) {
        return this.#searchNode(this.#root, key);
    }

    preOrderTraverse(callback) {
        this.#preOrderTraverseNode(this.#root, callback);
    }

    inOrderTraverse(callback) {
        this.#inOrderTraverseNode(this.#root, callback);
    }

    postOrderTraverse(callback) {
        this.#postOrderTraverseNode(this.#root, callback);
    }

    remove(key) {
        this.#root = this.#removeNode(this.#root, key);
    }

    toString() {
        if (this.isEmpty()) {
            return "BinarySearchTree()";
        }

        let res = "";
        const queue = new LinkedQueue();
        queue.enqueue(this.#root);

        while (!queue.isEmpty()) {
            const actual = queue.first();

            res += `, ${actual.key.toString()}`;

            if (actual.left) {
                queue.enqueue(actual.left);
            }

            if (actual.right) {
                queue.enqueue(actual.right);
            }

            queue.dequeue();
        }

        return `BinarySearchTree(${res.substring(2)})`;
    }

    #insertNode(node, key) {
        if (this.#compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key);
            } else {
                this.#insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.#insertNode(node.right, key);
            }
        }
    }

    #searchNode(node, key) {
        if (node == null) {
            return false;
        }

        if (this.#compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.#searchNode(node.left, key);
        } else if (this.#compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.#searchNode(node.right, key);
        } else {
            return true;
        }
    }

    #minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }

    #maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }

    #removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.#compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.#removeNode(node.left, key);
            return node;
        } else if (this.#compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.#removeNode(node.right, key);
            return node;
        } else {
            // En caso de haber encontrado el nodo buscado
            // Caso 1
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            // Caso 2
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            // Caso 3
            const aux = this.#minNode(node.right);
            node.key = aux.key;
            node.right = this.#removeNode(node.right, aux.key);
            return node;
        }
    }

    #preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.#preOrderTraverseNode(node.left, callback);
            this.#preOrderTraverseNode(node.right, callback);
        }
    }

    #inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.#inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.#inOrderTraverseNode(node.right, callback);
        }
    }

    #postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.#postOrderTraverseNode(node.left, callback);
            this.#postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
}

export default BinarySearchTree;