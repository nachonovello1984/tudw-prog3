/**
 * ArrayQueue implementa una cola circular utilizando un array de tamaño fijo.
 * La cola sigue el principio FIFO.
 * @class
 */
export class ArrayQueue {
    /**
     * @private
     * Array que almacena los elementos de la cola.
     * @type {Array<*>}
     */
    #items;

    /**
     * @private
     * Índice del frente de la cola, donde se elimina el próximo elemento.
     * @type {number}
     */
    #front;

    /**
     * @private
     * Índice del final de la cola, donde se añade el próximo elemento.
     * @type {number}
     */
    #back;

    /**
     * @private
     * Capacidad máxima de la cola.
     * @type {number}
     */
    #capacidad;

    /**
     * @private
     * Cantidad actual de elementos en la cola.
     * @type {number}
     */
    #size;

    /**
     * Crea una nueva instancia de ArrayQueue con una capacidad fija.
     * @param {number} capacidad - La capacidad máxima de la estructura.
     */
    constructor(capacidad) {
        this.#items = new Array(capacidad).fill(null);
        this.#front = 0;
        this.#back = -1;
        this.#size = 0;
        this.#capacidad = capacidad;
    }

    /**
     * Devuelve la cantidad actual de elementos.
     * @returns {number} El número de elementos en la estructura.
     */
    size() {
        return this.#size;
    }

    /**
     * Verifica si la estructura está vacía.
     * @returns {boolean} `true` si la cola no contiene elementos, de lo contrario `false`.
     */
    isEmpty() {
        return this.#size === 0;
    }

    /**
     * Devuelve el primer elemento sin eliminarlo.
     * @returns {*} El primer elemento en la cola, o `null` si la cola está vacía.
     */
    first() {
        if (this.isEmpty()){
            return null;
        }

        return this.#items[this.#front];
    }

    /**
     * Agrega un nuevo elemento al final de la cola.
     * @param {*} element - El elemento a añadir.
     * @throws {Error} Si la cola está llena y no se puede añadir más elementos.
     */
    enqueue(element) {
        if (this.#size + 1 > this.#capacidad) {
            throw new Error("La estructura está llena. El elemento no se puede insertar.");
        }

        this.#back = this._incrementar(this.#back);
        this.#items[this.#back] = element;
        this.#size++;
    }

    /**
     * Elimina y devuelve el primer elemento de la cola.
     * @returns {*} El primer elemento de la cola.
     * @throws {Error} Si la cola está vacía.
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("La operación solicitada no se puede llevar a cabo si la estructura está vacía.");
        }

        const res = this.#items[this.#front];
        this.#front = this._incrementar(this.#front);
        this.#size--;
        return res;
    }

    /**
     * @private
     * Incrementa un índice circularmente dentro de los límites de capacidad de la estructura.
     * @param {number} x - El índice a incrementar.
     * @returns {number} El índice incrementado, ajustado circularmente.
     */
    _incrementar(x) {
        return (x + 1) % this.#capacidad;
    }

    /**
     * Concatena todos los elementos en un único string.
     * @returns {string} Una representación en cadena de la cola.
     */
    toString() {
        if (this.isEmpty()) {
            return `ArrayQueue()`;
        }

        let res = "";

        for(let desde = this.#front; desde != this.#back; desde = this._incrementar(desde)){
            res += this.#items[desde] + ", ";
        }

        return `ArrayQueue(${res.slice(0, -2)})`;
    }
}
