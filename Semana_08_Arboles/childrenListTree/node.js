export default class Node {
    constructor(value) {
        this.value = value;
        this.children = null;
    }

    addChild = (node) => {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(node);
    }

    toString = () => {
        return `${this.value}`;
    }
}