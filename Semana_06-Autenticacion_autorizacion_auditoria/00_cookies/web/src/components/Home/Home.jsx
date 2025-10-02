import { Link } from 'react-router-dom';
import style from './Home.module.css';

const Home = () => {
    return <>
        <ul>
            <li><Link to="/list">Listado de Actores</Link></li>
            <li><Link to="/chosen">Actores seleccionados</Link></li>
        </ul>
    </>
};

export default Home;