// let alumno = {
//     matricula:  123,
//     nombre: 'Ignacio',
//     apellido: 'Novello',
//     conocimiento: 70,

//     estudiar: function(){
//         this.conocimiento = this.conocimiento + 5;
//     }
// }

// let alumno2 = {
//     matricula:  1234,
//     nombre: 'Enrique',
//     apellido: 'Pierotti',
//     conocimiento: 70,

//     estudiar: function(){
//         this.conocimiento = this.conocimiento + 5;
//     }
// }

// class Alumno {

//     constructor (matricula, nombre, apellido, conocimiento) {
//         this.matricula = matricula;
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.conocimiento = conocimiento;
//     }

//     estudiar(){
//         this.conocimiento = this.conocimiento + 5;
//     }

//     toString() {
//         return `Alumno(
//                     matricula: ${this.matricula},
//                     nombre: ${this.nombre},
//                     apellido: ${this.apellido},
//                     conocimiento: ${this.conocimiento})`
//     }
// }

// const nacho = new Alumno(123, "Ignacio", "Novello", 70);
// const enrique = new Alumno(1234, "Enrique", "Pierotti", 80);

// console.log(`nacho.conocimiento: ${nacho.conocimiento}`);
// nacho.estudiar();
// console.log(`nacho.conocimiento: ${nacho.conocimiento}`);
// console.log(`nacho: ${nacho}`);


// const alumnos = [nacho, enrique];
// alumnos.forEach(x => console.log(x));



// acceder a las propiedades del objeto
// console.log(alumno.conocimiento);
// alumno.estudiar();
// console.log(alumno.conocimiento);

export class Persona {

    static ANIO_ACTUAL = 2024;

    #nombre;

    constructor (nombre, apellido, anioNacimiento){
        this.#nombre = nombre;
        this.apellido = apellido;
        this.anioNacimiento = anioNacimiento;
    }

    calcularEdad () {
        return Persona.ANIO_ACTUAL - this.anioNacimiento;
    }

    toString() {
        return `Persona(
            * nombre: ${this.#nombre}, 
            * apellido: ${this.apellido},
            * año nacimiento: ${this.anioNacimiento},
            * edad: ${this.calcularEdad()})`;
    }
}