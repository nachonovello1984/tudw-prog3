class Persona{
    #nombre;
    #apellido;

    constructor (nombre, apellido) {
        this.#nombre = nombre;
        this.#apellido = apellido;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nuevoNombre) {
        this.#nombre = nuevoNombre;
    }

    get apellido() {
        return this.#apellido;
    }

    set apellido(nuevoApellido) {
        this.#apellido = nuevoApellido;
    }

    toString() {
        return `Persona(${this.#nombre}, ${this.#apellido})`;
    }
}

const persona1 = new Persona("Ignacio", "Novello")
console.log(persona1); //OK
console.log(persona1.toString());

const persona2 = new Persona("Cristian", "Faure")
console.log(persona2); //OK
console.log(persona2.toString());

const persona3 = new Persona("", "");

persona3.nombre = "Lara";
persona3.apellido = "Novello";

console.log(persona3.nombre);

console.log(persona3); //OK
console.log(persona3.toString());