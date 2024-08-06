export class ListNode {
    element;
    next;

    constructor(element, next) {
        this.element = element;
        this.next = next;
    }

    toString () {
        return `ListNode(${element})`;
    }
}