import { defaultToString } from '../utils.js';
import { ValuePair } from './valuePair.js';

/**
 * Clase que representa un mapeo que almacena pares clave-valor.
 * Utiliza una función personalizada para convertir claves a string.
 */
export class ObjMap {

    /** 
     * @private
     * @type {function} Función utilizada para convertir claves a string.
     */
    #toStrFn;

    /** 
     * @private
     * @type {Object} Tabla que almacena los pares clave-valor.
     */
    #table;

    /**
     * Crea una instancia de ObjMap.
     * 
     * @param {function} [toStrFn=defaultToString] - Función para convertir las claves a string.
     */
    constructor(toStrFn = defaultToString) {
        this.#toStrFn = toStrFn;
        this.#table = {};
    }

    /**
     * Inserta un nuevo par clave-valor en el mapeo.
     * 
     * @param {*} key - La clave del nuevo elemento.
     * @param {*} value - El valor asociado a la clave.
     * @returns {boolean} Retorna true si se agregó correctamente, false si la clave o el valor son nulos.
     */
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.#toStrFn(key);
            this.#table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    /**
     * Elimina un elemento del mapeo basado en la clave.
     * 
     * @param {*} key - La clave del elemento a eliminar.
     * @returns {boolean} Retorna true si el elemento fue eliminado, false si no se encontró.
     */
    remove(key) {
        if (this.hasKey(key)) {
            delete this.#table[this.#toStrFn(key)];
            return true;
        }
        return false;
    }

    /**
     * Verifica si el mapeo contiene una clave específica.
     * 
     * @param {*} key - La clave a verificar.
     * @returns {boolean} Retorna true si la clave existe en el mapeo, de lo contrario false.
     */
    hasKey(key) {
        return this.#table[this.#toStrFn(key)] != null;
    }

    /**
     * Obtiene el valor asociado a una clave específica.
     * 
     * @param {*} key - La clave del valor a obtener.
     * @returns {*} El valor asociado a la clave, o undefined si no existe.
     */
    get(key) {
        const valuePair = this.#table[this.#toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    /**
     * Retorna un array con todos los pares clave-valor del mapeo.
     * 
     * @returns {Array<ValuePair>} Un array de objetos ValuePair.
     */
    keyValues() {
        return Object.values(this.#table);
    }

    /**
     * Retorna un array con todas las claves del mapeo.
     * 
     * @returns {Array<*>} Un array de claves.
     */
    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }

    /**
     * Retorna un array con todos los valores del mapeo.
     * 
     * @returns {Array<*>} Un array de valores.
     */
    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }

    /**
     * Ejecuta una función para cada par clave-valor en el mapeo.
     * 
     * @param {function} callbackFn - Función que será ejecutada para cada elemento. 
     * Recibe como parámetros la clave y el valor de cada par.
     */
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) { // {2}
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // {3}
            if (result === false) {
                break;
            }
        }
    }

    /**
     * Elimina todos los elementos del mapeo.
     */
    clear() {
        this.#table = {};
    }

    /**
     * Retorna el número de elementos en el mapeo.
     * 
     * @returns {number} El tamaño del mapeo.
     */
    size() {
        return Object.keys(this.#table).length;
    }

    /**
     * Verifica si el mapeo está vacío.
     * 
     * @returns {boolean} Retorna true si el mapeo está vacío, de lo contrario false.
     */
    isEmpty() {
        return this.size() == 0;
    }

    /**
     * Retorna una representación en formato string del mapeo.
     * 
     * @returns {string} Un string en el formato `Map(<clave1: valor1>, <clave2: valor2>, ...)` o `Map()` si está vacío.
     */
    toString() {
        if (this.isEmpty()) {
            return "Map()";
        }

        let objString = '';
        this.keyValues().forEach((valuePair) => {
            objString += `${valuePair.toString()}, `;
        });

        return `Map(${objString.slice(0, -2)})`;
    }
}