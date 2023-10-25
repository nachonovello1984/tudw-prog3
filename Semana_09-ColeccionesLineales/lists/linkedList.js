import { ListNode } from '../listNode.js';
import { equals } from '../utils.js';

export class LinkedList {
    #header;
    #size;

    constructor() {
        this.#header = new ListNode(null, null);
        this.#size = 0;
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size == 0;
    }

    getItem(index) {
        if (Math.abs(index) > this.#size) {
            throw new Error("Índice inválido. No se puede completar la operación solicitada.");
        }

        let actual = this.#header.next;
        for (let i = 0; i < this.#size; i++) {

            if (i == index) {
                return actual.element;
            }

            actual = actual.next;
        }
    }

    setItem(index, element) {
        if (Math.abs(index) > this.#size) {
            throw new Error("Índice inválido. No se puede completar la operación solicitada.");
        }

        let actual = this.#header.next;
        for (let i = 0; i < this.#size; i++) {

            if (i == this.#size) {
                actual.element = element;
            }

            actual = actual.next;
        }
    }

    append(element) {
        let actual = this.#header;

        while (actual.next) {
            actual = actual.next;
        }

        actual.next = new ListNode(element);
        this.#size++;
    }

    remove(element) {

        if (this.isEmpty()) {
            throw new Error("La operación solicitada no se puede llevar a cabo si la estructura está vacía.");
        }

        let anterior = null;
        let actual = this.#header.next;

        while (actual) {
            if (equals(actual.element, element)) {
                if (anterior) {
                    anterior.next = actual.next;
                } else {
                    this.#header.next = actual.next;
                }
                break;
            }

            anterior = actual;
            actual = actual.next;
        }

        this.#size--;
    }

    toString() {
        if (this.isEmpty()) {
            return "LinkedList()";
        }

        let res = "";

        let actual = this.#header.next;
        while (actual) {
            res += actual.element + ", ";
            actual = actual.next;
        }

        return `LinkedList(${res.slice(0, -2)})`;
    }

    [Symbol.iterator]() {
        let actual = this.#header;

        return {
            next() {
                if (actual.next) {
                    actual = actual.next;
                    return { value: actual.element, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

}