# Ejemplo de Servidor y Cliente gRPC - Automóviles

Este proyecto demuestra el uso de gRPC con un servicio que devuelve una lista de automóviles. Incluye un servidor en JavaScript (Node.js) y clientes en JavaScript y Python.

## Estructura del Proyecto

- **automoviles.proto**: Definición del servicio y mensajes en Protocol Buffers
- **server.js**: Servidor gRPC (Node.js) que implementa el método `ObtenerAutomoviles`
- **client.js**: Cliente gRPC en JavaScript
- **client.py**: Cliente gRPC en Python
- **automoviles.js**: Datos de automóviles
- **package.json**: Dependencias de Node.js
- **requirements.txt**: Dependencias de Python
- **.env**: Configuración del servidor (HOST y PORT)

## Instalación

### Dependencias de Node.js (Servidor y Cliente JS)

```bash
npm install
```

### Dependencias de Python (Cliente Python)

```bash
pip install -r requirements.txt
```

### Generar archivos Python desde .proto

```bash
python generate_proto.py
```

Este comando generará los archivos `automoviles_pb2.py` y `automoviles_pb2_grpc.py` necesarios para el cliente Python.

## Uso

### 1. Iniciar el Servidor

En una terminal, ejecutar:

```bash
npm run server
```

El servidor se iniciará en el puerto 50051 y esperará conexiones de clientes.

### 2. Ejecutar el Cliente JavaScript

En otra terminal, ejecutar:

```bash
npm run client
```

### 3. Ejecutar el Cliente Python

Alternativamente, puedes usar el cliente Python:

```bash
python client.py
```

Ambos clientes se conectarán al servidor y solicitarán la lista de automóviles.

## Descripción del Servicio

### Mensaje Automovil

```protobuf
message Automovil {
  int32 id = 1;
  string marca = 2;
  string modelo = 3;
  int32 anio = 4;
  string color = 5;
  double precio = 6;
}
```

### Método ObtenerAutomoviles

- **Request**: `ObtenerAutomovilesRequest` (vacío)
- **Response**: `ObtenerAutomovilesResponse` con un array de automóviles
- **Descripción**: Devuelve una lista de automóviles disponibles

## Datos de Ejemplo

El servidor devuelve 5 automóviles de ejemplo con diferentes marcas, modelos, años, colores y precios.

## Tecnologías Utilizadas

### JavaScript/Node.js
- **@grpc/grpc-js**: Implementación de gRPC para Node.js
- **@grpc/proto-loader**: Cargador de archivos .proto
- **dotenv**: Gestión de variables de entorno

### Python
- **grpcio**: Implementación de gRPC para Python
- **grpcio-tools**: Herramientas para compilar archivos .proto
- **python-dotenv**: Gestión de variables de entorno

### Común
- **Protocol Buffers**: Formato de serialización de datos
