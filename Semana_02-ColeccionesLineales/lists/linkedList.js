import { ListNode } from '../listNode.js';
import { equals } from '../utils.js';

/**
 * LinkedList es una implementación de Lista Enlazada No Ordenada
 * @class
 */
export class LinkedList {

    /**
     * @private
     * Define el acceso a todos los nodos de la estructura.
     * Simplifica el diseño de algoritmos e iteradores.
     * @type {ListNode}
     */ 
    #header;

    /**
     * @private
     * Indica la cantidad actual de elementos almacenados en la estructura.
     * @type {number}
     */
    #size;

    /**
     * Crea una nueva LinkedList vacía.
     */
    constructor() {
        this.#header = new ListNode(null, null);
        this.#size = 0;
    }

    /** Devuelve la cantidad actual de elementos en la estructura.
     * @returns {number} El número de elementos en la lista.
     */
    size() {
        return this.#size;
    }

    /**
     * Indica si la lista está vacía.
     * @returns {boolean} `true` si la lista no contiene elementos caso contrario `false`.
     */
    isEmpty() {
        return this.#size == 0;
    }

    /**
     * Obtiene el elemento en la posición indicada por index.
     * @param {number} index - El índice del elemento a obtener.
     * @returns {*} El elemento en el índice especificado.
     * @throws {Error} Si el índice es inválido.
     */
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

    /**
     * Cambia por element el valor del nodo indicado por index.
     * @param {number} index - El índice del elemento a modificar.
     * @param {*} element - El nuevo valor del elemento.
     * @throws {Error} Si el índice es inválido.
     */
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

    /**
     * Agrega nuevo elemento al final de la lista.
     * @param {*} element - El elemento a añadir.
     */
    append(element) {
        let actual = this.#header;

        while (actual.next) {
            actual = actual.next;
        }

        actual.next = new ListNode(element);
        this.#size++;
    }

    /**
     * Elimina el primer elemento que coincida con el valor especificado.
     * @param {*} element - El elemento a eliminar.
     * @throws {Error} Si la lista está vacía.
     */
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

    /**
     * Convierte la lista en un string.
     * @returns {string} Una representación en cadena de la lista.
     */
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

    /**
     * Devuelve un iterador para recorrer los elementos de la lista.
     * @returns {Iterator} Un objeto iterador.
     */
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