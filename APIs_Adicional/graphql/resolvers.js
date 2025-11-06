import { pool } from './database.js';

// Resolvers para las consultas GraphQL
export const resolvers = {
  Query: {
    // ========== ACTORES ==========
    actors: async (_, { limit = 50 }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM actor LIMIT ?',
          [limit]
        );
        return rows;
      } catch (error) {
        console.error('Error al obtener actores:', error);
        throw new Error('Error al obtener actores');
      }
    },

    actor: async (_, { id }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM actor WHERE actor_id = ?',
          [id]
        );
        return rows[0] || null;
      } catch (error) {
        console.error('Error al obtener actor:', error);
        throw new Error('Error al obtener actor');
      }
    },

    actorsByName: async (_, { name }) => {
      try {
        const searchTerm = `%${name}%`;
        const [rows] = await pool.query(
          'SELECT * FROM actor WHERE first_name LIKE ? OR last_name LIKE ?',
          [searchTerm, searchTerm]
        );
        return rows;
      } catch (error) {
        console.error('Error al buscar actores:', error);
        throw new Error('Error al buscar actores');
      }
    },

    // ========== PELÍCULAS ==========
    films: async (_, { limit = 50 }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM film LIMIT ?',
          [limit]
        );
        return rows;
      } catch (error) {
        console.error('Error al obtener películas:', error);
        throw new Error('Error al obtener películas');
      }
    },

    film: async (_, { id }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM film WHERE film_id = ?',
          [id]
        );
        return rows[0] || null;
      } catch (error) {
        console.error('Error al obtener película:', error);
        throw new Error('Error al obtener película');
      }
    },

    filmsByTitle: async (_, { title }) => {
      try {
        const searchTerm = `%${title}%`;
        const [rows] = await pool.query(
          'SELECT * FROM film WHERE title LIKE ?',
          [searchTerm]
        );
        return rows;
      } catch (error) {
        console.error('Error al buscar películas:', error);
        throw new Error('Error al buscar películas');
      }
    },

    filmsByRating: async (_, { rating }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM film WHERE rating = ?',
          [rating]
        );
        return rows;
      } catch (error) {
        console.error('Error al filtrar películas por rating:', error);
        throw new Error('Error al filtrar películas por rating');
      }
    },

    // ========== CATEGORÍAS ==========
    categories: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM category');
        return rows;
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw new Error('Error al obtener categorías');
      }
    },

    category: async (_, { id }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM category WHERE category_id = ?',
          [id]
        );
        return rows[0] || null;
      } catch (error) {
        console.error('Error al obtener categoría:', error);
        throw new Error('Error al obtener categoría');
      }
    },

    // ========== CLIENTES ==========
    customers: async (_, { limit = 50 }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM customer LIMIT ?',
          [limit]
        );
        return rows.map(row => ({
          ...row,
          active: row.active === 1
        }));
      } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw new Error('Error al obtener clientes');
      }
    },

    customer: async (_, { id }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM customer WHERE customer_id = ?',
          [id]
        );
        if (rows[0]) {
          return {
            ...rows[0],
            active: rows[0].active === 1
          };
        }
        return null;
      } catch (error) {
        console.error('Error al obtener cliente:', error);
        throw new Error('Error al obtener cliente');
      }
    },

    customersByName: async (_, { name }) => {
      try {
        const searchTerm = `%${name}%`;
        const [rows] = await pool.query(
          'SELECT * FROM customer WHERE first_name LIKE ? OR last_name LIKE ?',
          [searchTerm, searchTerm]
        );
        return rows.map(row => ({
          ...row,
          active: row.active === 1
        }));
      } catch (error) {
        console.error('Error al buscar clientes:', error);
        throw new Error('Error al buscar clientes');
      }
    },

    // ========== TIENDAS ==========
    stores: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM store');
        return rows;
      } catch (error) {
        console.error('Error al obtener tiendas:', error);
        throw new Error('Error al obtener tiendas');
      }
    },

    store: async (_, { id }) => {
      try {
        const [rows] = await pool.query(
          'SELECT * FROM store WHERE store_id = ?',
          [id]
        );
        return rows[0] || null;
      } catch (error) {
        console.error('Error al obtener tienda:', error);
        throw new Error('Error al obtener tienda');
      }
    },

    // ========== ESTADÍSTICAS ==========
    stats: async () => {
      try {
        const [actorsCount] = await pool.query('SELECT COUNT(*) as count FROM actor');
        const [filmsCount] = await pool.query('SELECT COUNT(*) as count FROM film');
        const [customersCount] = await pool.query('SELECT COUNT(*) as count FROM customer');
        const [categoriesCount] = await pool.query('SELECT COUNT(*) as count FROM category');

        return {
          totalActors: actorsCount[0].count,
          totalFilms: filmsCount[0].count,
          totalCustomers: customersCount[0].count,
          totalCategories: categoriesCount[0].count
        };
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        throw new Error('Error al obtener estadísticas');
      }
    }
  }
};
