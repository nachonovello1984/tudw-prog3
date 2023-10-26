require('dotenv').config();
const readline = require('readline');
const amqp = require('amqplib');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function publicarMensaje(mensaje) {
    const cola = process.env.RABBITMQ_QUEUE;
    const conexion = await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING);
    const canal = await conexion.createChannel();

    //Toma o crea la cola con el nombre indicado por cola.
    await canal.assertQueue(cola);

    //Envío el mensaje
    canal.sendToQueue(cola, Buffer.from(mensaje));
}

async function ingresoPorConsola() {
    await rl.question('Ingrese un texto para enviar al consumidor ("salir" para finalizar): ', (res) => {
        if (res.toLowerCase() === 'salir') {
            rl.close();
        } else {
            publicarMensaje(res);
            console.log("Mensaje enviado!");
            ingresoPorConsola();
        }
    });
}

try {
    ingresoPorConsola();
} catch (error) {
    console.error('Error al publicar mensaje:', error);
}