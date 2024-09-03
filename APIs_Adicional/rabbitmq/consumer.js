require('dotenv').config();
const amqp = require('amqplib');

async function procesarMensajes() {

    const cola = process.env.RABBITMQ_QUEUE;
    const conexion = await amqp.connect(process.env.RABBITMQ_CONNECTION_STRING);
    const canal = await conexion.createChannel();

    await canal.assertQueue(cola);
    canal.consume(cola, async (mensaje) => {
        if (mensaje) {
            console.log(`Mensaje recibido: ${mensaje.content.toString()}`);

            //Confirmo que lo pude leer bien
            canal.ack(mensaje);
        }
    }, );
}
try {
    procesarMensajes();
} catch (error) {
    console.error('Error al procesar mensajes:', error);
}