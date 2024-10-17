import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import Header from '../Header/Header';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';

const Dashboard = () => {

    const { userData, setUserData } = useContext(UserContext);

    return (<>
        <Header />
        {
            userData.user &&
            <main>
                <h2>Bienvenido {userData.user.firstName}!</h2>
                <p>Tus datos son:</p>
                <fieldset>
                    <dl>
                        <dd>Nombre:</dd>
                        <dl>{userData.user.firstName}</dl>
                        <dd>Apellido:</dd>
                        <dl>{userData.user.lastName}</dl>
                    </dl>
                </fieldset>

                <ul>
                    <li><Link to="/restricted/actors">Ir a Actores</Link></li>
                    <ProtectedElement mustBeAdmin={true}>
                        <li><Link to="/restricted/films">Ir a Films</Link></li>
                    </ProtectedElement>
                </ul>
            </main>
        }
    </>);
}

export { Dashboard };