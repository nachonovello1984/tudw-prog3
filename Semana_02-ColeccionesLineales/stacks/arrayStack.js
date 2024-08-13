/**
 * ArrayStack implementa una pila utilizando un array.
 * La pila sigue el principio LIFO.
 * @class
 */
export class ArrayStack {

    /**
     * @private
     * Array que almacena los elementos de la pila.
     * @type {Array<*>}
     */
    #items;

    /**
     * @private
     * Cantidad actual de elementos en la pila.
     * @type {number}
     */
    #size;

    /**
     * Crea una nueva instancia de ArrayStack vacía.
     * Inicializa los elementos y el tamaño de la pila.
     */
    constructor() {
        this.clear();
    }

    /**
     * Obtiene la cantidad actual de elementos en la pila.
     * @returns {number} El número de elementos en la pila.
     */
    get size() {
        return this.#size;
    }

    /**
     * Verifica si la pila está vacía.
     * @returns {boolean} `true` si la pila no contiene elementos, de lo contrario `false`.
     */
    isEmpty() {
        return this.#size == 0;
    }

    /**
     * Obtiene el elemento del tope de la pila sin eliminarlo.
     * @returns {*} El elemento en el tope de la pila, o `null` si la pila está vacía.
     */
    peek() {
        if (this.isEmpty()){
            return null;
        }

        return this.#items.at(-1);
    }

    /**
     * Añade un nuevo elemento al tope de la pila.
     * @param {*} element - El elemento a añadir.
     */
    push(element) {
        this.#items.push(element);
        this.#size++;
    }

    /**
     * Elimina y devuelve el elemento del tope de la pila.
     * @returns {*} El elemento que estaba en el tope de la pila.
     * @throws {Error} Si la pila está vacía.
     */
    pop() {
        if (this.isEmpty()){
            throw new Error("La operación solicitada no se puede llevar a cabo dado que estructura está vacía");
        }
        
        const res = this.#items.at(-1);
        this.#items.pop();
        this.#size--;
        return res;
    }

    /**
     * Remueve todos los elementos de la pila.
     */
    clear() {
        this.#items = [];
        this.#size = 0;
    }

    /**
     * Concatena en un único string todos los elementos de la pila.
     * @returns {string} Una representación en cadena de la pila.
     */
    toString() {

        if (this.isEmpty()){
            return "ArrayStack()";
        }

        const res = this.#items.reduce((acumulador, actual) => {
            return  `${actual}, ${acumulador}`;
        }, "");

        return `ArrayStack(${res.slice(0, -2)})`;
    }
}