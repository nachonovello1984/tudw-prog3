import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import { UserContext } from '../UserContext/UserContext';

const Dashboard = () => {

    const { userData } = useContext(UserContext);

    return (userData.user ?
        <>
            <h1>Bienvenido {userData.user.displayName}!</h1>
            <p>Tus datos son:</p>
            <dl>
                <dd>Nombre:</dd>
                <dl>{userData.user.displayName}</dl>
                <dd>Email:</dd>
                <dl>{userData.user.email}</dl>
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