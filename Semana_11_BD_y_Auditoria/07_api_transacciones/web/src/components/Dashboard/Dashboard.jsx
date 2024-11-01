import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';

const Dashboard = () => {

    const { userData, setUserData } = useContext(UserContext);

    return (userData.user ?
        <>
            <h1>Bienvenido {userData.user.firstName}!</h1>
            <p>Tus datos son:</p>
            <dl>
                <dd>Nombre:</dd>
                <dl>{userData.user.firstName}</dl>
                <dd>Apellido:</dd>
                <dl>{userData.user.lastName}</dl>
            </dl>
            <ul>
                <li><Link to="/restricted/actors">Ir a Actores</Link></li>
                <ProtectedElement mustBeAdmin={true}>
                    <li><Link to="/restricted/films">Ir a Films</Link></li>
                </ProtectedElement>
            </ul>
        </> : <></>
    )
};

export { Dashboard };