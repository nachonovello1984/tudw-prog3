import { ListNode } from "../listNode.js";

/**
 * LinkedQueue implementa una cola enlazada simple.
 * La cola sigue el principio FIFO (First In, First Out), donde los elementos se añaden al final
 * y se eliminan desde el frente.
 * @class
 */
export class LinkedQueue{
    
    /**
     * @private
     * Nodo que representa el frente de la cola.
     * @type {ListNode|null}
     */
    #front;

    /**
     * @private
     * Nodo que representa el final de la cola.
     * @type {ListNode|null}
     */
    #back;

    /**
     * @private
     * Cantidad actual de elementos en la cola.
     * @type {number}
     */
    #size;

    /**
     * Crea una nueva instancia de LinkedQueue vacía.
     */
    constructor(){
        this.#front = this.#back = null;
        this.#size = 0;
    }

    /**
     * Devuelve la cantidad actual de elementos.
     * @returns {number} El número de elementos en la cola.
     */
    size() {
        return this.#size;
    }

    /**
     * Verifica si la estructura está vacía.
     * @returns {boolean} `true` si la cola no contiene elementos, de lo contrario `false`.
     */
    isEmpty () {
        return this.#size == 0;
    }

    /**
     * Obtiene el primer elemento sin eliminarlo.
     * @returns {*} El primer elemento en la cola, o `null` si la cola está vacía.
     */
    first() {
        if (this.isEmpty()){
            return null;
        }

        return this.#front.element;
    }

    /**
     * Añade un nuevo elemento al final de la estructura.
     * @param {*} element - El elemento a añadir.
     */
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

    /**
     * Elimina el primer elemento de la estructura.
     * @throws {Error} Si la cola está vacía.
     */
    dequeue(){
        if (this.isEmpty()) {
            throw new Error("La operación solicitada no se puede llevar a cabo si la estructura está vacía.");
        }

        this.#front = this.#front.next;
        this.#size--;
    }

    /**
     * Concatena todos los elementos en un único string.
     * @returns {string} Una representación en cadena de la cola.
     */
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