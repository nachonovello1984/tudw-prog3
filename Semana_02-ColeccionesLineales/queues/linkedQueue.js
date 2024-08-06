import { ListNode } from "../listNode.js";

export class LinkedQueue{
    #front;
    #back;
    #size;

    constructor(){
        this.#front = this.#back = null;
        this.#size = 0;
    }

    size() {
        return this.#size;
    }

    isEmpty () {
        return this.#size == 0;
    }

    first() {
        if (this.isEmpty()){
            return null;
        }

        return this.#front.element;
    }

    enqueue(element) {
        const nuevo = new ListNode(element);
        if (this.isEmpty()) {
            this.#front = this.#back = nuevo;
        } else {
            this.#back.next = nuevo;
            this.#back = nuevo;
        }

        this.#size++;
    }

    dequeue(){
        if (this.isEmpty()) {
            throw new Error("La operación solicitada no se puede llevar a cabo si la estructura está vacía.");
        }

        this.#front = this.#front.next;
        this.#size--;
    }

    toString() {
        if (this.isEmpty()) {
            return `LinkedQueue()`;
        }

        let res = "";
        let actual = this.#front;
        while (actual) {
            res += actual.element + ", ";
            actual = actual.next;
        }

        return `LinkedQueue(${res.slice(0, -2)})`;
    }

}