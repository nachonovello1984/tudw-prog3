import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    const handleLogout = async () => {
        const response = await fetch('http://localhost:3001/api/logout');
        if (!response.ok) {
            console.error('Error al cerrar sesión:', response.text);
            return;
        }

        setUserData(null);
        localStorage.removeItem("user");
        navigate('/');
    };

    return (<header>
        <div className="contenedor">
            <img className="logo" src="/img/logo.png" alt="Logo Prog3" />
            <h1>Prog<span className="red">III</span>&nbsp;<blockquote>Automóviles</blockquote></h1>
            <a onClick={handleLogout}>Cerrar sesión</a>
        </div>
    </header>);
};

export default Header;