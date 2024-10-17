import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    if (!userData) {
        const userLocal = JSON.parse(localStorage.getItem("user"));
        if (userLocal) {
            setUserData(userLocal);
        }
    }

    const isLoggedIn = () => {
        return (userData != null && userData.user != null);
    };

    const isAdmin = () => {
        return (userData != null && userData.user.rol === "admin");
    };

    const decodeTokenExpiration = (token) => {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.exp;
    };

    const validarToken = () => {
        if (userData && userData.user) {
            const tokenExpiration = decodeTokenExpiration(userData.token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (currentTime > tokenExpiration) {
                localStorage.removeItem('user');
                setUserData(null);
                navigate('/');
            }
        }
    };

    useEffect(() => {
        validarToken();
        const minuto = 1000 * 60;
        const hora = minuto * 60;
        const tiempoExpiracionToken = hora * 6;
        const intervalId = setInterval(validarToken, tiempoExpiracionToken); // Verifica cada minuto
        return () => clearInterval(intervalId);
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };