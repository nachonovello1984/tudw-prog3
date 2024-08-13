import { ListNode } from "../listNode.js";

/**
 * LinkedStack implementa una pila utilizando una estructura enlazada.
 * La pila sigue el principio LIFO.
 * @class
 */
export class LinkedStack {

    /**
     * @private
     * Nodo que representa el tope de la pila.
     * @type {ListNode|null}
     */
    #top;

    /**
     * @private
     * Cantidad actual de elementos en la pila.
     * @type {number}
     */
    #size;

    /**
     * Crea una nueva instancia de LinkedStack vacía.
     * Inicializa el tope de la pila y su tamaño.
     */
    constructor() {
        this.clear();
    }

    /**
     * Obtiene la cantidad actual de elementos en la pila.
     * @returns {number} El número de elementos en la pila.
     */
    size() {
        return this.#size;
    }

    /**
     * Indica si la pila está vacía.
     * @returns {boolean} `true` si la pila no contiene elementos, de lo contrario `false`.
     */
    isEmpty() {
        return this.#size == 0;
    }

    /**
     * Obtiene el elemento del tope de la pila sin eliminarlo.
     * @returns {*} El elemento del tope de la pila, o `null` si la pila está vacía.
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.#top.element;
    }

    /**
     * Añade un nuevo elemento al tope de la pila.
     * @param {*} element - El elemento a añadir.
     */
    push(element) {
        const nuevo = new ListNode(element, this.#top);
        this.#top = nuevo;
        this.#size++;
    }

    /**
     * Elimina y devuelve el elemento del tope de la pila.
     * @returns {*} El elemento que estaba del tope de la pila.
     * @throws {Error} Si la pila está vacía.
     */
    pop() {
        if (this.isEmpty()) {
            throw new Error("La operación solicitada no se puede llevar a cabo dado que estructura está vacía");
        }

        const res = this.#top.element;
        this.#top = this.#top.next;
        this.#size--;
        return res;
    }

    /**
     * Remueve todos los elementos de la pila, dejándola vacía.
     */
    clear() {
        this.#top = null;
        this.#size = 0;
    }

    /**
     * Concatena en un único string todos los elementos de la pila.
     * @returns {string} Una representación en cadena de la pila.
     */
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