export default class ChildrenListTree {
    #root;

    constructor(root) {
        this.#root = root;
    }

    isEmpty = () => {
        return this.#root == null;
    }

    toString = () => {
        if (this.isEmpty()) {
            return `ChildrenListTree()`;    
        }
        return `ChildrenListTree(${this.#dfsTraversal(this.#root).substring(2)})`;
    }

    #dfsTraversal(node) {
        if (!node) {
            return "";
        }

        let res = `, ${node.value.toString()}`;
        if (node.children != null && node.children.length > 0) {
            res += node.children.map(child => this.#dfsTraversal(child)).join('');
        }
        return res;
    }
}

