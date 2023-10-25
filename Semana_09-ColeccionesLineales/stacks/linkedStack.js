import { ListNode } from "../listNode.js";

export class LinkedStack {

    #top;
    #size;

    constructor() {
        this.clear();
    }

    get size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size == 0;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.#top.element;
    }

    push(element) {
        const nuevo = new ListNode(element, this.#top);
        this.#top = nuevo;
        this.#size++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("La operación solicitada no se puede llevar a cabo dado que estructura está vacía");
        }

        const res = this.#top.element;
        this.#top = this.#top.next;
        this.#size--;
        return res;
    }

    clear() {
        this.#top = null;
        this.#size = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return "LinkedStack()";
        }

        let res = "";
        let actual = this.#top;
        while (actual) {
            res += actual.element + ", ";
            actual = actual.next;
        }

        return `LinkedStack(${res.slice(0, -2)})`;
    }
}