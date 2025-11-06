# GraphQL Sakila Database Client

Aplicación web completa que utiliza GraphQL para consultar la base de datos Sakila de MySQL. Incluye un servidor GraphQL con Apollo Server y un cliente web interactivo.

## Características

- ✅ Servidor GraphQL con Apollo Server
- ✅ Conexión a base de datos MySQL (Sakila)
- ✅ Cliente web interactivo con interfaz moderna
- ✅ Consultas a múltiples tablas (Actores, Películas, Clientes, Categorías)
- ✅ Búsqueda y filtrado de datos
- ✅ Estadísticas en tiempo real
- ✅ Diseño responsive y atractivo

## Requisitos Previos

- Node.js (v16 o superior)
- MySQL Server
- Base de datos Sakila instalada

### Instalar Base de Datos Sakila

Si no tienes la base de datos Sakila, puedes descargarla desde:
https://dev.mysql.com/doc/index-other.html

O instalarla con estos comandos:

```bash
# Descargar
wget https://downloads.mysql.com/docs/sakila-db.tar.gz

# Extraer
tar -xvf sakila-db.tar.gz

# Importar en MySQL
mysql -u root -p < sakila-db/sakila-schema.sql
mysql -u root -p < sakila-db/sakila-data.sql
```

## Instalación

1. **Instalar dependencias:**

```bash
npm install
```

2. **Configurar variables de entorno:**

Copia `.env.example` a `.env` y configura tus credenciales de MySQL:

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
PORT=4000
HOST=localhost

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=sakila
```

## Uso

### Iniciar el servidor

```bash
npm start
```

El servidor iniciará en `http://localhost:4000`

### Acceder a la aplicación

- **Cliente Web:** http://localhost:4000
- **GraphQL Playground:** http://localhost:4000/graphql

## Estructura del Proyecto

```
graphql/
├── server.js           # Servidor principal
├── schema.js           # Definición del esquema GraphQL
├── resolvers.js        # Resolvers para las consultas
├── database.js         # Configuración de MySQL
├── package.json        # Dependencias
├── .env.example        # Ejemplo de variables de entorno
└── public/
    ├── index.html      # Interfaz web
    ├── styles.css      # Estilos
    └── app.js          # Lógica del cliente
```

## Esquema GraphQL

### Tipos Principales

#### Actor
```graphql
type Actor {
  actor_id: Int!
  first_name: String!
  last_name: String!
  last_update: String!
}
```

#### Film
```graphql
type Film {
  film_id: Int!
  title: String!
  description: String
  release_year: Int
  rental_rate: Float!
  length: Int
  rating: String
}
```

#### Customer
```graphql
type Customer {
  customer_id: Int!
  first_name: String!
  last_name: String!
  email: String
  active: Boolean!
  create_date: String!
}
```

#### Category
```graphql
type Category {
  category_id: Int!
  name: String!
  last_update: String!
}
```

### Consultas Disponibles

#### Actores
```graphql
# Obtener todos los actores (con límite opcional)
actors(limit: Int): [Actor!]!

# Obtener un actor por ID
actor(id: Int!): Actor

# Buscar actores por nombre
actorsByName(name: String!): [Actor!]!
```

#### Películas
```graphql
# Obtener todas las películas
films(limit: Int): [Film!]!

# Obtener una película por ID
film(id: Int!): Film

# Buscar películas por título
filmsByTitle(title: String!): [Film!]!

# Filtrar películas por rating
filmsByRating(rating: String!): [Film!]!
```

#### Clientes
```graphql
# Obtener todos los clientes
customers(limit: Int): [Customer!]!

# Obtener un cliente por ID
customer(id: Int!): Customer

# Buscar clientes por nombre
customersByName(name: String!): [Customer!]!
```

#### Categorías
```graphql
# Obtener todas las categorías
categories: [Category!]!

# Obtener una categoría por ID
category(id: Int!): Category
```

#### Estadísticas
```graphql
# Obtener estadísticas generales
stats: Stats!

type Stats {
  totalActors: Int!
  totalFilms: Int!
  totalCustomers: Int!
  totalCategories: Int!
}
```

## Ejemplos de Consultas

### Obtener actores
```graphql
query {
  actors(limit: 10) {
    actor_id
    first_name
    last_name
  }
}
```

### Buscar películas por título
```graphql
query {
  filmsByTitle(title: "ACADEMY") {
    film_id
    title
    description
    release_year
    rating
  }
}
```

### Filtrar películas por rating
```graphql
query {
  filmsByRating(rating: "PG-13") {
    title
    rating
    rental_rate
  }
}
```

### Obtener estadísticas
```graphql
query {
  stats {
    totalActors
    totalFilms
    totalCustomers
    totalCategories
  }
}
```

## Características del Cliente Web

### Interfaz
- **Dashboard con estadísticas:** Muestra totales de actores, películas, clientes y categorías
- **Navegación por tabs:** Organiza las diferentes secciones
- **Búsqueda en tiempo real:** Busca por nombre o título
- **Filtros:** Filtra películas por rating
- **Diseño responsive:** Funciona en móviles y escritorio

### Funcionalidades
- Ver listados completos de actores, películas, clientes y categorías
- Buscar actores por nombre
- Buscar películas por título
- Filtrar películas por rating (G, PG, PG-13, R, NC-17)
- Buscar clientes por nombre
- Ver estadísticas generales

## Tecnologías Utilizadas

### Backend
- **Apollo Server:** Framework GraphQL
- **Express:** Servidor web
- **MySQL2:** Cliente MySQL para Node.js
- **dotenv:** Gestión de variables de entorno

### Frontend
- **HTML5/CSS3:** Estructura y estilos
- **JavaScript ES6+:** Lógica del cliente
- **Fetch API:** Consultas GraphQL

## Troubleshooting

### Error de conexión a MySQL
- Verifica que MySQL esté corriendo
- Confirma las credenciales en el archivo `.env`
- Asegúrate de que la base de datos Sakila esté instalada

### Puerto en uso
- Cambia el puerto en el archivo `.env`
- O detén el proceso que está usando el puerto 4000

### No se muestran datos
- Verifica que la base de datos Sakila tenga datos
- Revisa la consola del servidor para errores
- Abre la consola del navegador para ver errores del cliente

## Posibles Mejoras

- [ ] Agregar mutaciones (crear, actualizar, eliminar)
- [ ] Implementar paginación
- [ ] Agregar relaciones entre tablas (actores de una película, etc.)
- [ ] Caché con DataLoader
- [ ] Autenticación y autorización
- [ ] Suscripciones en tiempo real
- [ ] Tests unitarios y de integración

## Licencia

ISC
