import { ObjSet } from './sets/objSet.js';
import { ObjMap } from './maps/objMap.js';
import { HashTable } from './maps/hashTable.js';

function setClient() {
    const conjunto1 = new ObjSet();
    for (let i = 1; i <= 100; i++) {
        const agregar = i % 10;
        console.log(`conjunto1.add(${agregar})`);
        conjunto1.add(agregar);
    }

    console.log(`conjunto1: ${conjunto1}`);
    console.log(`conjunto1.has(9)?: ${conjunto1.has(9)}`);
    console.log(`conjunto1.has(20)?: ${conjunto1.has(20)}`);

    const conjunto2 = new ObjSet();
    conjunto2.add(1, 2, 3, 4, 100);
    conjunto2.add(2);
    conjunto2.add(3);
    conjunto2.add(4);
    conjunto2.add(100);

    console.log(`conjunto2: ${conjunto2}`);
    console.log(`conjunto1.union(conjunto2): ${conjunto1.union(conjunto2).toString()}`)
    console.log(`conjunto1.interseccion(conjunto2): ${conjunto1.interseccion(conjunto2).toString()}`)
    console.log(`conjunto1.diferencia(conjunto2): ${conjunto1.diferencia(conjunto2).toString()}`)
}

function mapClient() {
    const map = new ObjMap();
    map.set("Manchester City", 28);
    map.set("Liverpool", 27);
    map.set("Arsenal", 27);
    map.set("Tottenham", 26);
    map.set("Aston Villa", 25);

    console.log(`map: ${map}`)

    map.remove("Arsenal");
    console.log(`map.remove("Arsenal"): ${map}`);

    console.log(`map.hasKey("Arsenal"): ${map.hasKey("Arsenal")}`);

    console.log(`Prueba de map.forEach()`);
    map.forEach((key, value) => {
        console.log(`${key} -> ${value}`);
    });

}

function mapClientLibro() {
    const map = new ObjMap();
    map.set('Gandalf', 'gandalf@email.com');
    map.set('John', 'johnsnow@email.com');
    map.set('Tyrion', 'tyrion@email.com');

    console.log(`Prueba de map.forEach()`);
    map.forEach((key, value) => {
        console.log(`${key} -> ${value}`);
    });
}

function hashTableClient() {
    const hash = new HashTable();

    console.log(hash.hashCode('Gandalf') + ' - Gandalf');
    console.log(hash.hashCode('John') + ' - John');
    console.log(hash.hashCode('Tyrion') + ' - Tyrion');
    console.log(hash.hashCode('Nacho') + ' - Nacho');
    console.log(hash.hashCode('ohcaN') + ' - ohcaN');

    hash.put('Gandalf', 'gandalf@email.com');
    hash.put('John', 'johnsnow@email.com');
    hash.put('Tyrion', 'tyrion@email.com');
    hash.put('Nacho', 'Nacho');
    hash.put('ohcaN', 'ohcaN');

    console.log(`hash: ${hash}`);
}

function esSetClient() {
    const set = new Set();
    set.add(1);
    set.add(2);
    set.add(3);
    console.log(set.values()); 
    console.log(set.has(1)); 
    console.log(set.size); 

    set.delete(1);

    console.log(set.values()); 
    console.log(set.has(1)); 
    console.log(set.size); 
}

function esMapClient() {
    const map = new Map();
    map.set('Gandalf', 'gandalf@email.com');
    map.set('John', 'johnsnow@email.com');
    map.set('Tyrion', 'tyrion@email.com');
    console.log(map.has('Gandalf'));
    console.log(map.size);
    console.log(map.keys());
    console.log(map.values());
    console.log(map.get('Tyrion'));
}

function esWeakMapClient() {
    const weakMap = new WeakMap();
    const ob1 = { name: 'Gandalf' };
    const ob2 = { name: 'John' };
    const ob3 = { name: 'Tyrion' };
    weakMap.set(ob1, 'gandalf@email.com');
    weakMap.set(ob2, 'johnsnow@email.com');
    weakMap.set(ob3, 'tyrion@email.com');
    //weakMap.set("test", 'tyrion@email.com'); //inválido.
    console.log(weakMap.has(ob1));
    console.log(weakMap.get(ob3));
    weakMap.delete(ob2);
    console.log(weakMap);
    console.log(Object.keys(weakMap));
    console.log(weakMap.toString());
}

//esSetClient();
//setClient();

//mapClient();
//mapClientLibro();

//hashTableClient();

//esMapClient();

//esWeakMapClient();