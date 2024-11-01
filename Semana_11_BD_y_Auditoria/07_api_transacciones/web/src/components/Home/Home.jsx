import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <h1>Hola! Haga click en "Iniciar sesión" para ingresar a la aplicación.</h1>
            <Link to="/login">Iniciar sesión</Link>
            <h2>Si no quiere puede contactarse con nosotros.</h2>
            <Link to="/contacto">Contacto</Link>
        </>
    );
};

export { Home }