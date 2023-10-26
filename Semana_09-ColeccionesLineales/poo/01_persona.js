class Persona{
    constructor (nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    toString() {
        return `Persona(${this.nombre}, ${this.apellido})`;
    }
}

const persona1 = new Persona("Ignacio", "Novello")
console.log(persona1); //No está bien
console.log(persona1.toString());

const persona2 = new Persona("Cristian", "Faure")
console.log(persona2); //No está bien
console.log(persona2.toString());