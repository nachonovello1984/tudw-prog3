import { Link } from 'react-router-dom';
import List from '../Actors/List';
import Chosen from '../Actors/Chosen';

const Home = () => {
    return <>
        <ul>
            <li><Link to="/list">Listado de Actores</Link></li>
            <li><Link to="/chosen">Actores seleccionados</Link></li>
        </ul>
    </>
};

export default Home;