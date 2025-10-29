const map = new Map();
map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');
console.log(map.has('Gandalf'));
console.log(map.size);
console.log(map.keys());
console.log(map.values());
console.log(map.get('Tyrion'));


const map2 = new Map();
map2.set("Argentina", "Peso Argentino")
map2.set("Brasil", "Real Brasileño")
map2.set("España", "Euro")
map2.set("Italia", "Euro")
map2.set("Grecia", "Euro")
console.log(map2.has("Argentina"));
console.log(map2.size);
console.log(map2.keys());
console.log(map2.values());
console.log("Grecia:", map2.get('Grecia'));
map2.set("Grecia", "Drachma")
console.log("Grecia: ", map2.get('Grecia'))