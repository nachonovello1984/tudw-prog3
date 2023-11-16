import { defaultToString } from '../utils.js';
import { ValuePair } from './valuePair.js';

export class ObjMap {

    #toStrFn;
    #table;

    constructor(toStrFn = defaultToString) {
        this.#toStrFn = toStrFn;
        this.#table = {};
    }

    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.#toStrFn(key);
            this.#table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.#table[this.#toStrFn(key)];
            return true;
        }
        return false;
    }

    hasKey(key) {
        return this.#table[this.#toStrFn(key)] != null;
    }

    get(key) {
        const valuePair = this.#table[this.#toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    keyValues() {
        return Object.values(this.#table);
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }

    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }

    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) { // {2}
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // {3}
            if (result === false) {
                break;
            }
        }
    }

    clear() {
        this.#table = {};
    }

    size() {
        return Object.keys(this.#table).length;
    }

    isEmpty() {
        return this.size() == 0;
    }

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