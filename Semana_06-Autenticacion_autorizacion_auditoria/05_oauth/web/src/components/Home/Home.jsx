import { Link } from 'react-router-dom';
import Header from './../Header/Header';
const Home = () => {
    return (
        <>
            <Header/>
            <main>
                <div class="contenedor">
                    <p>Haga click en "Iniciar sesión" para ingresar a la aplicación.</p>
                    <div style={{ clear: "both", margin: "2rem 0rem" }}>
                        <Link to="/login" className="btn">Iniciar sesión</Link>
                    </div>
                    
                    <p>Si no quiere puede contactarse con nosotros.</p>
                    <div style={{ clear: "both", margin: "2rem 0rem" }}>
                        <Link to="/contacto" className="btn">Contacto</Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export { Home }