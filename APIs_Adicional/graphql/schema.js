// Definición del esquema GraphQL para la base de datos Sakila
export const typeDefs = `#graphql
  type Actor {
    actor_id: Int!
    first_name: String!
    last_name: String!
    last_update: String!
  }

  type Film {
    film_id: Int!
    title: String!
    description: String
    release_year: Int
    language_id: Int!
    rental_duration: Int!
    rental_rate: Float!
    length: Int
    replacement_cost: Float!
    rating: String
    special_features: String
    last_update: String!
  }

  type Category {
    category_id: Int!
    name: String!
    last_update: String!
  }

  type Customer {
    customer_id: Int!
    store_id: Int!
    first_name: String!
    last_name: String!
    email: String
    address_id: Int!
    active: Boolean!
    create_date: String!
    last_update: String!
  }

  type Store {
    store_id: Int!
    manager_staff_id: Int!
    address_id: Int!
    last_update: String!
  }

  type Query {
    # Consultas de Actores
    actors(limit: Int): [Actor!]!
    actor(id: Int!): Actor
    actorsByName(name: String!): [Actor!]!

    # Consultas de Películas
    films(limit: Int): [Film!]!
    film(id: Int!): Film
    filmsByTitle(title: String!): [Film!]!
    filmsByRating(rating: String!): [Film!]!

    # Consultas de Categorías
    categories: [Category!]!
    category(id: Int!): Category

    # Consultas de Clientes
    customers(limit: Int): [Customer!]!
    customer(id: Int!): Customer
    customersByName(name: String!): [Customer!]!

    # Consultas de Tiendas
    stores: [Store!]!
    store(id: Int!): Store

    # Estadísticas
    stats: Stats!
  }

  type Stats {
    totalActors: Int!
    totalFilms: Int!
    totalCustomers: Int!
    totalCategories: Int!
  }
`;
