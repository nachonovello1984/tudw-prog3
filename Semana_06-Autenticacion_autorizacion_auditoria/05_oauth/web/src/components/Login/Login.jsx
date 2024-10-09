import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

import './Login.css';

const Login = () => {

    const { userData, setUserData } = useContext(UserContext);
    
    const handleLogin = () => {
        // Redirige a la autenticación con Google en el backend
        window.location.href = 'http://localhost:3001/auth/google';
    };

    const handleLogout = () => {
        fetch('http://localhost:3001/api/logout')
            .then(() => setUserData(null))
            .catch(error => console.error('Error al cerrar sesión:', error));
    };

    return <>
        <h1>Inicio de sesión</h1>
        <div className="App">
            <h1>Autenticación con Google</h1>
            {userData ? (
                <div>
                    <p>Bienvenido, {userData.displayName}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Iniciar sesión con Google</button>
            )}
        </div>
    </>;

};

export { Login };