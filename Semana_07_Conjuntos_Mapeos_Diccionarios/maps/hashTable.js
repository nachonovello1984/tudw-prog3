import { defaultToString } from '../utils.js';
import { ValuePair } from './valuePair.js';

/**
 * Clase que representa una tabla hash, que almacena pares clave-valor utilizando funciones hash.
 */
export class HashTable {
    /**
     * @private
     * @type {Object} Almacena los pares clave-valor en la tabla hash.
     */
    #table

    /**
     * @private
     * @type {function} Función utilizada para convertir claves a string.
     */
    #toStrFn
    
    /**
     * Crea una instancia de HashTable.
     * 
     * @param {function} [toStrFn=defaultToString] - Función para convertir las claves a string antes de aplicar la función hash.
     */
    constructor(toStrFn = defaultToString) {
        this.#toStrFn = toStrFn;
        this.#table = {};
    }

    /**
     * Función hash simple que calcula un código hash para la clave.
     * Utiliza el algoritmo `loseloseHashCode`.
     * 
     * @param {*} key - La clave para la cual se quiere calcular el hash.
     * @returns {number} El código hash de la clave.
     */
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.#toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }

    /**
     * Función hash avanzada que calcula un código hash para la clave.
     * Utiliza el algoritmo `djb2HashCode`.
     * 
     * @param {*} key - La clave para la cual se quiere calcular el hash.
     * @returns {number} El código hash de la clave.
     */
    djb2HashCode(key) {
        const tableKey = this.#toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++) {
            hash += (hash * 33) + tableKey.charCodeAt(i);
        } 
        return hash % 1013;
    }

    /**
     * Método que calcula el código hash de una clave utilizando `loseloseHashCode` por defecto.
     * 
     * @param {*} key - La clave para la cual se quiere calcular el hash.
     * @returns {number} El código hash de la clave.
     */
    hashCode(key) {
        return this.djb2HashCode(key);
    }

    /**
     * Retorna la cantidad de elementos almacenados en la tabla hash.
     * 
     * @returns {number} El tamaño de la tabla hash.
     */
    size() {
        return Object.keys(this.#table).length;
    }

    /**
     * Verifica si la tabla hash está vacía.
     * 
     * @returns {boolean} Retorna true si la tabla hash está vacía, de lo contrario false.
     */
    isEmpty() {
        return this.size() == 0;
    }

    /**
     * Inserta un nuevo par clave-valor en la tabla hash.
     * 
     * @param {*} key - La clave del nuevo elemento.
     * @param {*} value - El valor asociado a la clave.
     * @returns {boolean} Retorna true si se agregó correctamente, false si la clave o el valor son nulos.
     */
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.#table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    /**
     * Obtiene el valor asociado a una clave específica.
     * 
     * @param {*} key - La clave del valor a obtener.
     * @returns {*} El valor asociado a la clave, o undefined si no existe.
     */
    get(key) {
        const valuePair = this.#table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    
    /**
     * Elimina un par clave-valor de la tabla hash basado en la clave.
     * 
     * @param {*} key - La clave del elemento a eliminar.
     * @returns {boolean} Retorna true si el elemento fue eliminado, false si no se encontró.
     */
    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.#table[hash];
        if (valuePair != null) {
            delete this.#table[hash];
            return true;
        }
        return false;
    }

    /**
     * Retorna una representación en formato string de la tabla hash.
     * 
     * @returns {string} Un string en el formato 
     * `HashTable(<clave1: valor1>, <clave2: valor2>, ...)` o `HashTable()` si está vacía.
     */
    toString() {
        if (this.isEmpty()) {
            return "HashTable()";
        }

        let objString = '';
        Object.keys(this.#table).forEach(key => {
            const valuePair = this.#table[key];
            if (valuePair) {
                objString += `${valuePair.toString()}, `;
            }
        });

        return `HashTable(${objString.slice(0, -2)})`;
    }
}