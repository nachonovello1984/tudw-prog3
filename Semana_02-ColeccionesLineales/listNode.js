/**
 * ListNode representa un nodo en una lista enlazada.
 * @class
 */
export class ListNode {
    /**
    * Elemento almacenado en el nodo.
    * @type {*}
    */
    element;

    /**
     * Referencia al siguiente nodo en la lista.
     * @type {ListNode|null}
     */
    next;

    /**
     * Crea una nueva instancia de ListNode.
     * @param {*} element - El elemento a almacenar en el nodo.
     * @param {ListNode|null} next - El siguiente nodo en la lista.
     */
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }

    /**
     * Convierte el nodo en un string.
     * @returns {string} Una representación en cadena del nodo.
     */
    toString() {
        return `ListNode(${element})`;
    }
}