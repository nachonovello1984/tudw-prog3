import { ArrayStack } from "./stacks/arrayStack.js";
import { LinkedStack } from "./stacks/linkedStack.js";

import { ArrayQueue } from "./queues/arrayQueue.js";
import { LinkedQueue } from "./queues/linkedQueue.js";

import { LinkedList } from "./lists/linkedList.js";

function decimalToBinary(decNumber) {
    const stack = new ArrayStack();
    let number = decNumber;
    let rem;
    let binaryString = '';
    while (number > 0) { 
        rem = Math.floor(number % 2); 
        stack.push(rem); 
        number = Math.floor(number / 2); 
    }
    while (!stack.isEmpty()) {
        binaryString += stack.pop().toString();
    }
    return binaryString;
}

//LinkedList
function clienteLinkedList() {
    const list = new LinkedList();

    for (let i = 1; i <= 10; i++) {
        list.append(i);
    }

    console.log(`list: ${list}`);

    process.stdout.write('Iterador: ');
    for (let item of list) {
        process.stdout.write(`${item}, `);
    }
    console.log();
    console.log("Inicia vaciado de lista:")
    while (!list.isEmpty()) {
        console.log(list.getItem(0));
        list.remove(list.getItem(0));
    }

}

//ArrayQueue

function clienteArrayQueue() {
    console.group("ArrayQueue")
    const queue = new ArrayQueue(10);

    for (let i = 1; i <= 10; i++) {
        queue.enqueue(i);
    }

    console.log(`queue: ${queue}`);
    console.log("Inicia vaciado de fila:")
    while (!queue.isEmpty()) {
        console.log(queue.first());
        queue.dequeue();
    }
    console.groupEnd();
}

//LinkedQueue

function clienteLinkedQueue() {
    console.group("LinkedQueue")
    const queue = new LinkedQueue();

    for (let i = 1; i <= 10; i++) {
        queue.enqueue(i);
    }

    console.log(`queue: ${queue}`);
    console.log("Inicia vaciado de fila:")
    while (!queue.isEmpty()) {
        console.log(queue.first());
        queue.dequeue();
    }
    console.groupEnd();
}

//ArrayStack

function clienteArrayStack() {
    console.group("ArrayStack")
    const stack = new ArrayStack();

    for (let i = 1; i <= 10; i++) {
        stack.push(i);
    }

    console.log(`stack: ${stack}`);
    console.log("Inicia vaciado de pila:")
    while (!stack.isEmpty()) {
        console.log(stack.peek());
        stack.pop();
    }
    console.groupEnd();
}

//LinkedStack

function clienteLinkedStack() {
    console.group("LinkedStack");
    const stack = new LinkedStack();

    for (let i = 1; i <= 10; i++) {
        stack.push(i);
    }

    console.log(`stack: ${stack}`);
    console.log("Inicia vaciado de pila:")
    while (!stack.isEmpty()) {
        console.log(stack.peek());
        stack.pop();
    }
    console.groupEnd();
}


function stacks() {
    clienteArrayStack();
    clienteLinkedStack();
    console.log(`decimalToBinary(106): ${decimalToBinary(106)}`);
}

function queues() {
    clienteArrayQueue();
    clienteLinkedQueue();
}

function lists() {
    clienteLinkedList();
}

clienteLinkedList();