import 'dotenv/config';
import { createInterface } from 'readline/promises';
import amqp from 'amqplib';

const rl = createInterface({ input: process.stdin, output: process.stdout });

async function publicarMensaje(mensaje) {
    const cola = process.env.RABBITMQ_QUEUE;
    const conexion = await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING);
    const canal = await conexion.createChannel();

    await canal.assertQueue(cola);
    canal.sendToQueue(cola, Buffer.from(mensaje));

    await canal.close();
    await conexion.close();
}

async function ingresoPorConsola() {
    while (true) {
        const res = await rl.question('Ingrese un texto para enviar al consumidor ("salir" para finalizar): ');
        if (res.toLowerCase() === 'salir') {
            rl.close();
            break;
        }
        await publicarMensaje(res);
        console.log("Mensaje enviado!");
    }
}

ingresoPorConsola().catch(error => console.error('Error al publicar mensaje:', error));
