class Persona{
    #nombre;
    #apellido;
    #oficina;
    #jefe;

    constructor (nombre, apellido, oficina, jefe) {
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#oficina = oficina;
        this.#jefe = jefe;

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

    get oficina() {
        return this.#oficina;
    }

    set oficina(oficina) {
        this.#oficina = oficina;
    }

    get jefe() {
        return this.#jefe;
    }

    set jefe(jefe) {
        this.#jefe = jefe;
    }

    toString() {
        return `Persona(nombre:${this.#nombre}, apellido: ${this.#apellido}, oficina: ${this.#oficina}, jefe: ${this.#jefe} )`;
    }
}

class Oficina{
    
    #nombre;
    #ciudad;

    constructor(nombre, ciudad) {
        this.#nombre = nombre;
        this.#ciudad = ciudad;
    }

    get nombre() {
        return this.#nombre;
    }

    get ciudad() {
        return this.#ciudad;
    }

    toString(){
        return `Oficina(nombre:${this.#nombre}, ciudad: ${this.#ciudad})`;
    }
}

const persona3 = new Persona("Lara", "Novello", new Oficina("CEO", "Concordia"), null);

const persona1 = new Persona("Ignacio", "Novello", new Oficina("Comercial", "Concordia"), persona3);

const persona2 = new Persona("Cristian", "Faure", new Oficina("Jefatura de Desagues", "Concordia"), persona1);
console.log(`${persona2}`); //OK

