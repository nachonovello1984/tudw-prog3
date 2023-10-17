export class Racional {
    
    constructor(numerador, denominador) {
        if (!(  Number.isInteger(numerador) && 
                Number.isInteger(denominador) && 
                denominador !== 0)) {
            throw new Error("Numerador y denominador deben ser enteros y el denominador no puede ser cero.");
        }

        this.numerador = numerador;
        this.denominador = denominador;
    }

    sumar(param1, param2) {
        if (!(param1 && param1 instanceof Racional)) {
            throw new Error("Parámetro 1 no especificado o inválido");
        }

        if (!(param2 && param2 instanceof Racional)) {
            throw new Error("Parámetro 2 no especificado o inválido");
        }

        return new Racional((param1.numerador * param2.denominador) + (param1.denominador * param2.numerador), param1.denominador * param2.denominador);
    }

    restar(param1) {
        if (!(param1 && param1 instanceof Racional)) {
            throw new Error("Parámetro 1 no especificado o inválido");
        }

        if (!(param2 && param2 instanceof Racional)) {
            throw new Error("Parámetro 2 no especificado o inválido");
        }

        return new Racional((param1.numerador * param2.denominador) - (param1.denominador * param2.numerador), param1.denominador * param2.denominador);
    }

    multiplicar(param1) {
        if (!(param1 && param1 instanceof Racional)) {
            throw new Error("Parámetro 1 no especificado o inválido");
        }

        if (!(param2 && param2 instanceof Racional)) {
            throw new Error("Parámetro 2 no especificado o inválido");
        }

        return new Racional(param1.numerador * param2.numerador, param1.denominador * param2.denominador);
    }

    dividir(param1) {
        if (!(param1 && param1 instanceof Racional)) {
            throw new Error("Parámetro 1 no especificado o inválido");
        }

        if (!(param2 && param2 instanceof Racional)) {
            throw new Error("Parámetro 2 no especificado o inválido");
        }

        return new Racional(param1.numerador * param2.denominador, param1.denominador * param2.numerador);
    }

    toString() {
        return `Racional(${this.numerador}/${this.denominador})`;
    }
};