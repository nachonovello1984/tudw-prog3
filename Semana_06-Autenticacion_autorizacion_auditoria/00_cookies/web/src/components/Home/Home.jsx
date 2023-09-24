import { Link } from 'react-router-dom';
import List from '../Actors/List';
import Chosen from '../Actors/Chosen';

const Home = () => {
    return <>
        <ul>
            <li><Link to="/list">List</Link></li>
            <li><Link to="/chosen">Chosen</Link></li>
        </ul>
    </>
};

export default Home;