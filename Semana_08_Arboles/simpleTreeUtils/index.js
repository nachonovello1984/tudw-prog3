import { TreeUtils } from "simple-tree-utils";

const treeUtils = new TreeUtils(); // without config, default values are used (id as idProp, parentId as parentIdProp, children as childrenProp)
const items = [
  {id: 1, parentId: null, name: 'Tecnicatura en Desarrollo Web'},
  {id: 2, parentId: null, name: 'Licenciatura en Sistemas'},
  {id: 3, parentId: 1, name: 'Introducción a la Informática'},
  {id: 4, parentId: 1, name: 'Programación 1'},
  {id: 5, parentId: 1, name: 'Arquitectura de Computadoras'},
  {id: 6, parentId: 2, name: 'Algoritmos'},
  {id: 7, parentId: 2, name: 'Organización de Computadoras'},
  {id: 8, parentId: 2, name: 'Matemática 1'},

];

const tree = treeUtils.list2Tree(items);
console.log("----------------");
console.log("Con JSON.stringify");
console.log("----------------");
console.log(JSON.stringify(tree, null, 2));

console.log("----------------");
console.log("Con for");
console.log("----------------");
for (const node of tree) {
  console.log(`Nodo.id: ${node.id}, Nodo.nombre: ${node.name}`);
  for (const child of node.children) {
    console.log(`\t* Hijo.id: ${child.id}, Hijo.nombre: ${child.name}`);
  }
}
