// URL del servidor GraphQL
const GRAPHQL_URL = '/graphql';

// Elementos del DOM
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

// ========== UTILIDADES ==========

// Realizar consulta GraphQL
async function graphqlQuery(query, variables = {}) {
  showLoading();
  hideError();

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    showError(error.message);
    throw error;
  } finally {
    hideLoading();
  }
}

function showLoading() {
  loadingEl.classList.remove('hidden');
}

function hideLoading() {
  loadingEl.classList.add('hidden');
}

function showError(message) {
  errorEl.textContent = `Error: ${message}`;
  errorEl.classList.remove('hidden');
}

function hideError() {
  errorEl.classList.add('hidden');
}

// ========== TABS ==========

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    
    // Actualizar botones
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Actualizar contenido
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// ========== ESTADÍSTICAS ==========

async function loadStats() {
  const query = `
    query {
      stats {
        totalActors
        totalFilms
        totalCustomers
        totalCategories
      }
    }
  `;

  try {
    const data = await graphqlQuery(query);
    document.getElementById('total-actors').textContent = data.stats.totalActors;
    document.getElementById('total-films').textContent = data.stats.totalFilms;
    document.getElementById('total-customers').textContent = data.stats.totalCustomers;
    document.getElementById('total-categories').textContent = data.stats.totalCategories;
  } catch (error) {
    console.error('Error al cargar estadísticas:', error);
  }
}

// ========== ACTORES ==========

async function loadActors() {
  const query = `
    query {
      actors(limit: 50) {
        actor_id
        first_name
        last_name
        last_update
      }
    }
  `;

  try {
    const data = await graphqlQuery(query);
    displayActors(data.actors);
  } catch (error) {
    console.error('Error al cargar actores:', error);
  }
}

async function searchActors() {
  const searchTerm = document.getElementById('actor-search').value.trim();
  
  if (!searchTerm) {
    loadActors();
    return;
  }

  const query = `
    query SearchActors($name: String!) {
      actorsByName(name: $name) {
        actor_id
        first_name
        last_name
        last_update
      }
    }
  `;

  try {
    const data = await graphqlQuery(query, { name: searchTerm });
    displayActors(data.actorsByName);
  } catch (error) {
    console.error('Error al buscar actores:', error);
  }
}

function displayActors(actors) {
  const container = document.getElementById('actors-list');
  
  if (actors.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎭</div>
        <p>No se encontraron actores</p>
      </div>
    `;
    return;
  }

  container.innerHTML = actors.map(actor => `
    <div class="data-card">
      <h3>${actor.first_name} ${actor.last_name}</h3>
      <p><strong>ID:</strong> ${actor.actor_id}</p>
      <p><strong>Última actualización:</strong> ${new Date(actor.last_update).toLocaleDateString()}</p>
    </div>
  `).join('');
}

// ========== PELÍCULAS ==========

async function loadFilms() {
  const query = `
    query {
      films(limit: 50) {
        film_id
        title
        description
        release_year
        rental_rate
        length
        rating
      }
    }
  `;

  try {
    const data = await graphqlQuery(query);
    displayFilms(data.films);
  } catch (error) {
    console.error('Error al cargar películas:', error);
  }
}

async function searchFilms() {
  const searchTerm = document.getElementById('film-search').value.trim();
  
  if (!searchTerm) {
    loadFilms();
    return;
  }

  const query = `
    query SearchFilms($title: String!) {
      filmsByTitle(title: $title) {
        film_id
        title
        description
        release_year
        rental_rate
        length
        rating
      }
    }
  `;

  try {
    const data = await graphqlQuery(query, { title: searchTerm });
    displayFilms(data.filmsByTitle);
  } catch (error) {
    console.error('Error al buscar películas:', error);
  }
}

async function filterFilmsByRating() {
  const rating = document.getElementById('rating-filter').value;
  
  if (!rating) {
    loadFilms();
    return;
  }

  const query = `
    query FilterFilms($rating: String!) {
      filmsByRating(rating: $rating) {
        film_id
        title
        description
        release_year
        rental_rate
        length
        rating
      }
    }
  `;

  try {
    const data = await graphqlQuery(query, { rating });
    displayFilms(data.filmsByRating);
  } catch (error) {
    console.error('Error al filtrar películas:', error);
  }
}

function displayFilms(films) {
  const container = document.getElementById('films-list');
  
  if (films.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎬</div>
        <p>No se encontraron películas</p>
      </div>
    `;
    return;
  }

  container.innerHTML = films.map(film => `
    <div class="data-card">
      <h3>${film.title}</h3>
      <p><strong>Año:</strong> ${film.release_year || 'N/A'}</p>
      <p><strong>Duración:</strong> ${film.length || 'N/A'} min</p>
      <p><strong>Tarifa:</strong> $${film.rental_rate}</p>
      <span class="badge">${film.rating || 'N/A'}</span>
      ${film.description ? `<div class="description">${film.description}</div>` : ''}
    </div>
  `).join('');
}

// ========== CLIENTES ==========

async function loadCustomers() {
  const query = `
    query {
      customers(limit: 50) {
        customer_id
        first_name
        last_name
        email
        active
        create_date
      }
    }
  `;

  try {
    const data = await graphqlQuery(query);
    displayCustomers(data.customers);
  } catch (error) {
    console.error('Error al cargar clientes:', error);
  }
}

async function searchCustomers() {
  const searchTerm = document.getElementById('customer-search').value.trim();
  
  if (!searchTerm) {
    loadCustomers();
    return;
  }

  const query = `
    query SearchCustomers($name: String!) {
      customersByName(name: $name) {
        customer_id
        first_name
        last_name
        email
        active
        create_date
      }
    }
  `;

  try {
    const data = await graphqlQuery(query, { name: searchTerm });
    displayCustomers(data.customersByName);
  } catch (error) {
    console.error('Error al buscar clientes:', error);
  }
}

function displayCustomers(customers) {
  const container = document.getElementById('customers-list');
  
  if (customers.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👥</div>
        <p>No se encontraron clientes</p>
      </div>
    `;
    return;
  }

  container.innerHTML = customers.map(customer => `
    <div class="data-card">
      <h3>${customer.first_name} ${customer.last_name}</h3>
      <p><strong>ID:</strong> ${customer.customer_id}</p>
      <p><strong>Email:</strong> ${customer.email || 'N/A'}</p>
      <p><strong>Fecha de registro:</strong> ${new Date(customer.create_date).toLocaleDateString()}</p>
      <span class="badge ${customer.active ? 'active' : 'inactive'}">
        ${customer.active ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  `).join('');
}

// ========== CATEGORÍAS ==========

async function loadCategories() {
  const query = `
    query {
      categories {
        category_id
        name
        last_update
      }
    }
  `;

  try {
    const data = await graphqlQuery(query);
    displayCategories(data.categories);
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
}

function displayCategories(categories) {
  const container = document.getElementById('categories-list');
  
  if (categories.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📁</div>
        <p>No se encontraron categorías</p>
      </div>
    `;
    return;
  }

  container.innerHTML = categories.map(category => `
    <div class="data-card">
      <h3>${category.name}</h3>
      <p><strong>ID:</strong> ${category.category_id}</p>
      <p><strong>Última actualización:</strong> ${new Date(category.last_update).toLocaleDateString()}</p>
    </div>
  `).join('');
}

// ========== INICIALIZACIÓN ==========

// Cargar datos iniciales al cargar la página
window.addEventListener('load', () => {
  loadStats();
  loadActors();
});

// Event listeners para búsqueda con Enter
document.getElementById('actor-search').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchActors();
});

document.getElementById('film-search').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchFilms();
});

document.getElementById('customer-search').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchCustomers();
});
