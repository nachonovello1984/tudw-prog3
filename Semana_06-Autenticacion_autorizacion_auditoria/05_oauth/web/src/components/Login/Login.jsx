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

    return <>
        <Header />
        <main>
            <h2>Inicio de sesión con Google</h2>
            {userData ? (<div><p>Bienvenido, {userData.displayName}</p></div>) : (
                <button className="btn" onClick={handleLogin}>Iniciar sesión con Google</button>
            )}
        </main>
    </>;

};

export { Login };