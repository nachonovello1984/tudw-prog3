export class Racional {
    
    #numerador;
    #denominador;

    constructor(numerador, denominador) {
        if (!(Number.isInteger(numerador) && Number.isInteger(denominador) && denominador !== 0)) {
            throw new TypeError("Numerador y denominador deben ser enteros y el denominador no puede ser cero.");
        }

        this.#numerador = numerador;
        this.#denominador = denominador;
    }

    get numerador() {
        return this.#numerador;
    }

    get denominador() {
        return this.#denominador;
    }

    sumar(param) {
        if (!(param && param instanceof Racional)) {
            throw new TypeError("Parámetro no especificado o inválido");
        }

        return new Racional((this.#numerador * param.denominador) + (this.#denominador * param.numerador), this.#denominador * param.denominador);
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
