# Chat en Tiempo Real con WebSockets

Aplicación de chat básica que utiliza WebSockets para comunicación en tiempo real entre múltiples usuarios.

## Características

- ✅ Comunicación en tiempo real con WebSockets
- ✅ Múltiples usuarios simultáneos
- ✅ Interfaz moderna y responsive
- ✅ Notificaciones de sistema (usuarios conectados/desconectados)
- ✅ Contador de usuarios en línea
- ✅ Reconexión automática
- ✅ Persistencia del nombre de usuario
- ✅ Timestamps en mensajes
- ✅ Diseño atractivo con gradientes

## Estructura del Proyecto

```
websockets/
├── server.js           # Servidor WebSocket y HTTP
├── package.json        # Dependencias del proyecto
├── .env.example        # Ejemplo de variables de entorno
└── public/
    ├── index.html      # Interfaz del chat
    ├── styles.css      # Estilos
    └── app.js          # Lógica del cliente WebSocket
```

## Instalación

1. **Instalar dependencias:**

```bash
npm install
```

2. **Configurar variables de entorno (opcional):**

Copia `.env.example` a `.env` y ajusta los valores si es necesario:

```bash
cp .env.example .env
```

Variables disponibles:
- `PORT`: Puerto del servidor (default: 3000)
- `HOST`: Host del servidor (default: localhost)

## Uso

### Iniciar el servidor

```bash
npm start
```

El servidor iniciará en `http://localhost:3000` (o el puerto configurado).

### Acceder al chat

1. Abre tu navegador en `http://localhost:3000`
2. Ingresa tu nombre de usuario
3. Escribe mensajes y presiona Enter o haz clic en "Enviar"
4. Abre múltiples pestañas/ventanas para simular varios usuarios

## Funcionalidades Técnicas

### Servidor (server.js)

- **Express**: Sirve archivos estáticos
- **ws**: Librería WebSocket para Node.js
- **Broadcast**: Envía mensajes a todos los clientes conectados
- **Gestión de clientes**: Mantiene un Set de conexiones activas
- **Mensajes del sistema**: Notifica eventos (conexión/desconexión)

### Cliente (app.js)

- **Conexión WebSocket**: Se conecta automáticamente al servidor
- **Reconexión automática**: Intenta reconectar cada 3 segundos si se pierde la conexión
- **Tipos de mensajes**:
  - `system`: Mensajes del sistema (bienvenida, usuarios conectados)
  - `message`: Mensajes de chat de usuarios
- **LocalStorage**: Guarda el nombre de usuario entre sesiones

## Protocolo de Mensajes

### Mensaje enviado por el cliente

```json
{
  "username": "Juan",
  "message": "Hola a todos!"
}
```

### Mensaje del sistema

```json
{
  "type": "system",
  "message": "Un nuevo usuario se ha unido al chat",
  "timestamp": "2024-11-04T19:30:00.000Z",
  "totalUsers": 3
}
```

### Mensaje de chat

```json
{
  "type": "message",
  "username": "Juan",
  "message": "Hola a todos!",
  "timestamp": "2024-11-04T19:30:00.000Z"
}
```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **ws**: Librería WebSocket
- **HTML5/CSS3**: Interfaz de usuario
- **JavaScript ES6+**: Lógica del cliente
- **dotenv**: Gestión de variables de entorno

## Características de la Interfaz

- **Diseño responsive**: Funciona en móviles y escritorio
- **Gradientes modernos**: Colores atractivos
- **Animaciones suaves**: Transiciones y efectos
- **Scrollbar personalizado**: Estilo coherente
- **Indicador de estado**: Muestra si está conectado o desconectado
- **Contador de usuarios**: Muestra cuántos usuarios están en línea

## Posibles Mejoras

- [ ] Autenticación de usuarios
- [ ] Salas de chat separadas
- [ ] Historial de mensajes persistente
- [ ] Envío de archivos/imágenes
- [ ] Emojis y reacciones
- [ ] Notificaciones de escritura ("usuario está escribiendo...")
- [ ] Mensajes privados
- [ ] Moderación de chat

## Troubleshooting

### El servidor no inicia
- Verifica que el puerto no esté en uso
- Asegúrate de haber instalado las dependencias con `npm install`

### No se conecta el WebSocket
- Verifica que el servidor esté corriendo
- Revisa la consola del navegador para errores
- Asegúrate de que no haya firewall bloqueando la conexión

### Los mensajes no se envían
- Verifica el estado de conexión (debe decir "Conectado")
- Revisa la consola del navegador y del servidor para errores

## Licencia

ISC
