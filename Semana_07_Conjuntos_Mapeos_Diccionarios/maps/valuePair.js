/**
 * Clase que representa un par clave-valor.
 */
export class ValuePair {
    /**
     * Crea una instancia de ValuePair.
     * 
     * @param {*} key - La clave del par.
     * @param {*} value - El valor asociado a la clave.
     */
    constructor(key, value) {
        /**
         * La clave del par.
         * @type {*}
         */
        this.key = key;

        /**
         * El valor asociado a la clave.
         * @type {*}
         */
        this.value = value;
    }

    /**
     * Retorna una representación en formato string del par clave-valor.
     * 
     * @returns {string} Una cadena en el formato `<clave: valor>`.
     */
    toString() {
        return `<${this.key}: ${this.value}>`;
    }
}