// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    axios.get('http://localhost:3001/api/current_user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error('Error al obtener el usuario:', error));
  }, []);

  const handleLogin = () => {
    // Redirige a la autenticación con Google en el backend
    window.location.href = 'http://localhost:3001/auth/google';
  };

  const handleLogout = () => {
    axios.get('http://localhost:3001/api/logout', { withCredentials: true })
      .then(() => setUser(null))
      .catch(error => console.error('Error al cerrar sesión:', error));
  };

  return (
    <div className="App">
      <h1>Autenticación con Google</h1>
      {user ? (
        <div>
          <p>Bienvenido, {user.displayName}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión con Google</button>
      )}
    </div>
  );
}

export default App;
