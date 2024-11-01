// import BinarySearchTree from './binarySearchTree/binarySearchTree.js';
import ChildrenListTree from "./childrenListTree/childrenListTree.js";
import Node from "./childrenListTree/node.js";

// function bstClient() {
//     const arbol = new BinarySearchTree();

//     arbol.insert(11);
//     arbol.insert(7);
//     arbol.insert(15);
//     arbol.insert(5);
//     arbol.insert(3);
//     arbol.insert(6)
//     arbol.insert(9);
//     arbol.insert(8);
//     arbol.insert(10);
//     arbol.insert(13);
//     arbol.insert(12);
//     arbol.insert(14);
//     arbol.insert(20);
//     arbol.insert(18);
//     arbol.insert(25);

//     console.log(`arbol: ${arbol.toString()}`);
//     console.log(`arbol.min(): ${arbol.min().toString()}`);
//     console.log(`arbol.max(): ${arbol.max().toString()}`);
//     // arbol.remove(25);
//     // console.log(`arbol.remove(25): ${arbol.toString()}`);
//     // console.log(`arbol.max(): ${arbol.max().toString()}`);


//     console.log(`arbol.preOrderTraverse():`);
//     arbol.preOrderTraverse(x => process.stdout.write(`${x},`));



//     // console.log(`\narbol.inOrderTraverse():`);
//     // arbol.inOrderTraverse(x => process.stdout.write(`${x},`));
//     // console.log();
// }

function childrenListClient() {
    const nodeProg  = new Node("Programación");
    const nodeProg1 = new Node("Programación 1");
    const nodeProg2 = new Node("Programación 2");
    const nodeIntroDevWeb = new Node("Introducción al Desarrollo Web");
    const nodeProg3 = new Node("Programación 3");

    nodeProg.addChild(nodeProg1);
    nodeProg.addChild(nodeProg2);
    nodeProg.addChild(nodeIntroDevWeb);
    nodeProg.addChild(nodeProg3);

    const nodeArso = new Node("ARSO");
    const nodeIntro = new Node("Introducción a la Informática");
    const nodeArq = new Node("Arquitectura de Computadoras");
    const nodeSo = new Node("Sistemas Operativos");

    nodeArso.addChild(nodeIntro);
    nodeArso.addChild(nodeArq);
    nodeArso.addChild(nodeSo);

    const nodeTudw = new Node("TUDW");
    nodeTudw.addChild(nodeProg);
    nodeTudw.addChild(nodeArso);

    const arbol = new ChildrenListTree(nodeTudw);
    console.log(`arbol: ${arbol.toString()}`);
}

//bstClient();
childrenListClient();