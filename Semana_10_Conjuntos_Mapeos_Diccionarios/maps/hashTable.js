import { defaultToString } from '../utils.js';
import { ValuePair } from './valuePair.js';

export class HashTable {
    #table
    #toStrFn
    
    constructor(toStrFn = defaultToString) {
        this.#toStrFn = toStrFn;
        this.#table = {};
    }

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

    djb2HashCode(key) {
        const tableKey = this.#toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++) {
            hash = (hash * 33) + tableKey.charCodeAt(i);
        } 
        return hash % 1013;
    }

    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    size() {
        return Object.keys(this.#table).length;
    }

    isEmpty() {
        return this.size() == 0;
    }

    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.#table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    get(key) {
        const valuePair = this.#table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.#table[hash];
        if (valuePair != null) {
            delete this.#table[hash];
            return true;
        }
        return false;
    }

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