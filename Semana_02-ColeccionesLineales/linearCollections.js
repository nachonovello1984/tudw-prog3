/**
 * El siguiente archivo pretende mostrar la forma en la que se utilizan 
 * arrays como colecciones lineales de acceso restringido: Pilas y Colas.
 */

const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

console.log(`stack: ${stack}`);
console.log("Comienza el vaciado de 'stack'");

while (stack.length > 0) {
    console.log(stack.pop());
}

const queue = [];
queue.push(1);
queue.push(2);
queue.push(3);
queue.push(4);
queue.push(5);

console.log(`queue: ${queue}`);
console.log("Comienza el vaciado de 'queue'");

while (queue.length > 0) {
    console.log(queue.shift());
}