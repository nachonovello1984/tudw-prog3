export class ObjSet {
    
    #items;

    constructor() {
        this.clear();
    }

    isEmpty() {
        return Object.keys(this.#items).length == 0;
    }

    size() {
        return Object.keys(this.#items).length;
    }

    has(element) {
        //Alternativa no del todo segura ya que no todos los objetos derivan de Object.prototype.
        //return this.items.hasOwnProperty(element)
        return Object.prototype.hasOwnProperty.call(this.#items, element);
    }

    values() {
        return Object.values(this.#items);
    }

    add(element) {
        if (!(element in this.#items)) {
            this.#items[element] = element;
            return true;
        }

        return false;
    }

    delete(element) {
        if (!(element in this.items)) {
            return false;
        }

        delete this.#items[element];
        return true;
    }

    clear() {
        this.#items = {};
    }

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


