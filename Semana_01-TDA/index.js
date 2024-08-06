import { Racional as Racionalv1} from './racional.js';

let var1 = new Racionalv1(1, 2);
let var2 = new Racionalv1(1, 4);

console.log(`var1: ${var1}`);
console.log(`var2: ${var2}`);
console.log(`var1.sumar(var2): ${var1.sumar(var1, var2)}\n`);
console.log(var1.numerador);
