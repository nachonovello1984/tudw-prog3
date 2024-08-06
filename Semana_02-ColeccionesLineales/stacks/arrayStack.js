export class ArrayStack {

    #items;
    #size;

    constructor() {
        this.clear();
    }

    get size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size == 0;
    }

    peek() {
        if (this.isEmpty()){
            return null;
        }

        return this.#items.at(-1);
    }

    push(element) {
        this.#items.push(element);
        this.#size++;
    }

    pop() {
        if (this.isEmpty()){
            throw new Error("La operación solicitada no se puede llevar a cabo dado que estructura está vacía");
        }
        
        const res = this.#items.at(-1);
        this.#items.pop();
        this.#size--;
        return res;
    }

    clear() {
        this.#items = [];
        this.#size = 0;
    }

    toString() {

        if (this.isEmpty()){
            return "ArrayStack()";
        }

        const res = this.#items.reduce((acumulador, actual) => {
            return  actual + ", " + acumulador;
        }, "");

        return `ArrayStack(${res.slice(0, -2)})`;
    }
}