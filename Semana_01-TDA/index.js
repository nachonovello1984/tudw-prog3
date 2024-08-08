// import { Persona } from './persona.js';

// const persona1 = new Persona("Juan", "Perez", 1990);
// console.log(`nombre: ${persona1.nombre}`);
// console.log(`edad: ${persona1.calcularEdad()}`);
// console.log(`persona1: ${persona1}`);

import { Racional } from './racional.js';

try{
    let var1 = new Racional(1, 2);
    let var2 = new Racional(1, 4);

    console.log(`var1: ${var1}`);
    console.log(`var2: ${var2}`);
    console.log(`var1.sumar(var2): ${var1.sumar(var1, var2)}\n`);
    // console.log(var1.numerador);

} catch (exc) {
    console.error(exc);
}
