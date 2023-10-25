export class ArrayQueue{
    #items;
    #front;
    #back;
    #capacidad;
    #size;

    constructor(capacidad){
        this.#items = new Array(capacidad).fill(null);
        this.#front = 0;
        this.#back = -1;
        this.#size = 0;
        this.#capacidad = capacidad;
    }

    size() {
        return this.#size;
    }

    isEmpty () {
        return this.#size == 0;
    }

    first() {
        if (this.isEmpty()){
            return null;
        }

        return this.#items[this.#front];
    }

    enqueue(element) {
        if (this.#size + 1 > this.#capacidad) {
            throw new Error("La estructura está llena. El elemento no se puede insertar.");
        }

        this.#back = this._incrementar(this.#back);
        this.#items[this.#back] = element;
        this.#size++;
    }

    dequeue(){
        if (this.isEmpty()) {
            throw new Error("La operación solicitada no se puede llevar a cabo si la estructura está vacía.");
        }

        const res = this.#items[this.#front];
        this.#front = this._incrementar(this.#front);
        this.#size--;
        return res;
    }

    _incrementar(x) {
        return (x + 1) % this.#capacidad;
    }

    toString() {
        if (this.isEmpty()) {
            return `ArrayQueue()`;
        }

        let res = "";
        let desde = this.#front;

        for(; desde == this.#back; desde = this._incrementar(desde)){
            res += this.#items[desde] + ", ";
        }

        return `ArrayQueue(${res.slice(0, -2)})`;
    }

}