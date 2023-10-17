export class Racional {
    constructor(numerador, denominador) {
        if (!(Number.isInteger(numerador) && Number.isInteger(denominador) && denominador !== 0)) {
            throw new Error("Numerador y denominador deben ser enteros y el denominador no puede ser cero.");
        }

        this.numerador = numerador;
        this.denominador = denominador;
    }

    sumar(param) {
        if (!(param && param instanceof Racional)) {
            throw new Error("Parámetro no especificado o inválido");
        }

        return new Racional((this.numerador * param.denominador) + (this.denominador * param.numerador), this.denominador * param.denominador);
    }

    restar(param) {
        if (!(param && param instanceof Racional)) {
            throw new Error("Parámetro no especificado o inválido");
        }

        return new Racional((this.numerador * param.denominador) - (this.denominador * param.numerador), this.denominador * param.denominador);
    }

    multiplicar(param) {
        if (!(param && param instanceof Racional)) {
            throw new Error("Parámetro no especificado o inválido");
        }

        return new Racional(this.numerador * param.numerador, this.denominador * param.denominador);
    }

    dividir(param) {
        if (!(param && param instanceof Racional)) {
            throw new Error("Parámetro no especificado o inválido");
        }

        return new Racional(this.numerador * param.denominador, this.denominador * param.numerador);
    }

    toString() {
        return `Racional(${this.numerador}/${this.denominador})`;
    }
};
