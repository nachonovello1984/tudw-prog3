//Ejemplo de uso de la clase Set ES2015
const conjunto = new Set();
for (let i = 1; i <= 100; i++) {
    const agregar = i % 10;
    console.log(`conjunto.add(${agregar})`);
    conjunto.add(agregar);
}

console.log(`Conjunto completo:`);
console.log(conjunto);
console.log(`conjunto.has(1)?: ${conjunto.has(1)}`);
console.log(`conjunto.has(10)?: ${conjunto.has(10)}`);
console.log(`conjunto.has(20)?: ${conjunto.has(20)}`);

for (let item of conjunto.values()) {
    console.log(`Iterador ${item}`);
}

for (let item of conjunto.entries()) {
    console.log(`Iterador ${item}`);
}

conjunto.clear();
console.log(conjunto);