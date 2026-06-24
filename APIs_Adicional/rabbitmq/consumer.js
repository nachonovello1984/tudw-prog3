import 'dotenv/config';
import amqp from 'amqplib';

async function procesarMensajes() {
    const cola = process.env.RABBITMQ_QUEUE;
    const conexion = await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING);
    const canal = await conexion.createChannel();

    await canal.assertQueue(cola);
    console.log(`Esperando mensajes en la cola "${cola}"...`);

    canal.consume(cola, (mensaje) => {
        if (mensaje) {
            console.log(`Mensaje recibido: ${mensaje.content.toString()}`);
            canal.ack(mensaje);
        }
    });
}

procesarMensajes().catch(error => console.error('Error al procesar mensajes:', error));
