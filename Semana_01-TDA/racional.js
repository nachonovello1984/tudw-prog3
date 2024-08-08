export class Racional {
    
    #numerador;
    #denominador;

    constructor(numerador, denominador) {
        if (!(  Number.isInteger(numerador) && 
                Number.isInteger(denominador) && denominador !== 0)) {
            throw new TypeError("Numerador y denominador deben ser enteros y el denominador no puede ser cero.");
        }

        this.#numerador = numerador;
        this.#denominador = denominador;
    }

    get numerador() {
        return this.#numerador;
    }

    set numerador(numerador) {
        if (!Number.isInteger(numerador)) {
            throw new TypeError("Numerador debe ser entero.");
        }

        this.#numerador = numerador;
    }

    get denominador() {
        return this.#denominador;
    }

    set denominador(denominador) {
        if (Number.isInteger(denominador) && denominador !== 0) {
            throw new TypeError("Denominador deben ser enteros y el denominador no puede ser cero.");
        }
        this.#denominador = denominador;
    }

    sumar(param) {
        if (!(param && param instanceof Racional)) {
            throw new TypeError("Parámetro no especificado o inválido");
        }

        return new Racional((this.#numerador * param.denominador) + 
                (this.#denominador * param.numerador), 
                this.#denominador * param.denominador);
    }

    restar(param) {
        if (!(param && param instanceof Racional)) {
            throw new TypeError("Parámetro no especificado o inválido");
        }

        return new Racional((this.#numerador * param.denominador) - (this.#denominador * param.numerador), this.#denominador * param.denominador);
    }

    multiplicar(param) {
        if (!(param && param instanceof Racional)) {
            throw new TypeError("Parámetro no especificado o inválido");
        }

        return new Racional(this.#numerador * param.numerador, this.#denominador * param.denominador);
    }

    dividir(param) {
        if (!(param && param instanceof Racional)) {
            throw new TypeError("Parámetro no especificado o inválido");
        }

        return new Racional(this.#numerador * param.denominador, this.#denominador * param.numerador);
    }

    toString() {
        return `Racional(${this.#numerador}/${this.#denominador})`;
    }
};
