import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import Header from '../Header/Header';
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
        <Header />
        <main>
            <h2>Inicio de sesión con Google</h2>
            {userData ? (
                <div>
                    <p>Bienvenido, {userData.displayName}</p>
                    <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <button className="btn" onClick={handleLogin}>Iniciar sesión con Google</button>
            )}
        </main>
    </>;

};

export { Login };