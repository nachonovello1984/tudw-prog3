/**
 * Clase que representa un conjunto de elementos únicos.
 * Encapsula funcionalidades similares al objeto Set nativo, con métodos adicionales.
 */
export class ObjSet {
    
    /** 
     * @private
     * @type {Object}
     * Almacena los elementos del conjunto. Cada clave es tanto la clave como el valor.
     */
    #items;

    /**
     * Crea una instancia vacía de ObjSet.
     */
    constructor() {
        this.clear();
    }

    /**
     * Verifica si el conjunto está vacío.
     * 
     * @returns {boolean} Retorna true si el conjunto está vacío, de lo contrario false.
     */
    isEmpty() {
        return Object.keys(this.#items).length == 0;
    }

    /**
     * Retorna la cantidad de elementos en el conjunto.
     * 
     * @returns {number} El tamaño del conjunto.
     */
    size() {
        return Object.keys(this.#items).length;
    }

    /**
     * Verifica si un elemento específico existe en el conjunto.
     * 
     * @param {*} element El elemento a verificar.
     * @returns {boolean} Retorna true si el elemento existe en el conjunto, de lo contrario false.
     */
    has(element) {
        //Alternativa no del todo segura ya que no todos los objetos derivan de Object.prototype.
        //return this.items.hasOwnProperty(element)
        return Object.prototype.hasOwnProperty.call(this.#items, element);
    }

    /**
     * Retorna un array con todos los valores del conjunto.
     * 
     * @returns {Array} Un array con los valores del conjunto.
     */
    values() {
        return Object.values(this.#items);
    }

    /**
     * Agrega un nuevo elemento al conjunto si no existe previamente.
     * 
     * @param {*} element El elemento a agregar.
     * @returns {boolean} Retorna true si el elemento fue agregado, de lo contrario false si ya existía.
     */
    add(element) {
        if (!(element in this.#items)) {
            this.#items[element] = element;
            return true;
        }

        return false;
    }

    /**
     * Elimina un elemento del conjunto.
     * 
     * @param {*} element El elemento a eliminar.
     * @returns {boolean} Retorna true si el elemento fue eliminado correctamente, 
     * de lo contrario false si no existe.
     */
    delete(element) {
        if (!(element in this.#items)) {
            return false;
        }

        delete this.#items[element];
        return true;
    }

    /**
     * Elimina todos los elementos del conjunto.
     */
    clear() {
        this.#items = {};
    }

    /**
     * Retorna una representación en formato string del conjunto.
     * 
     * @returns {string} Un string en formato `Set(elemento1, elemento2, ...)` o `Set()` si está vacío.
     */
    toString() {
        if (this.isEmpty()) {
            return "Set()";
        }

        let res = `Set(`;

        for (let key of Object.keys(this.#items)) {
            res += `${this.#items[key]}, `;
        }

        return `${res.slice(0, -2)})`;
    }

    /**
     * Retorna un nuevo conjunto que es la unión de este conjunto y otro ObjSet.
     * 
     * @param {ObjSet} param El otro conjunto con el que realizar la unión.
     * @returns {ObjSet} Un nuevo conjunto que es la unión de ambos conjuntos.
     */
    union(param) {
        if (!param instanceof ObjSet) {
            return;
        }

        const res = new ObjSet();
        for (let item of this.values()) {
            res.add(item);
        }
        for (let item of param.values()) {
            res.add(item);
        }

        return res;
    }

    /**
     * Retorna un nuevo conjunto que es la intersección de este conjunto y otro ObjSet.
     * 
     * @param {ObjSet} param El otro conjunto con el que realizar la intersección.
     * @returns {ObjSet} Un nuevo conjunto que contiene solo los elementos presentes 
     * en ambos conjuntos.
     */
    interseccion(param) {
        if (!param instanceof ObjSet) {
            return;
        }

        const res = new ObjSet();

        for (let item of param.values()) {
            if (this.has(item)) {
                res.add(item);
            }
        }

        return res;
    }

    /**
     * Retorna un nuevo conjunto que es la diferencia entre este conjunto y otro ObjSet.
     * 
     * @param {ObjSet} param El otro conjunto con el que realizar la diferencia.
     * @returns {ObjSet} Un nuevo conjunto que contiene los elementos en este conjunto 
     * pero no en el otro conjunto.
     */
    diferencia(param) {
        if (!param instanceof ObjSet) {
            return;
        }

        const res = new ObjSet();

        for (let item of this.values()) {
            if (!param.has(item)) {
                res.add(item);
            }
        }

        return res;
    }

}