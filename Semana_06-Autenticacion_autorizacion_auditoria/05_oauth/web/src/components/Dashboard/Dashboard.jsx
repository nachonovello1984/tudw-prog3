import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import { UserContext } from '../UserContext/UserContext';
import Header from '../Header/Header';
const Dashboard = () => {

    const { userData } = useContext(UserContext);

    return (
        <>
            <Header />
            {
                userData.user &&
                <main>
                    <h2>Bienvenido {userData.user.displayName}!</h2>
                    <p>Tus datos son:</p>
                    <fieldset>
                        <dl>
                            <dd>Nombre:</dd>
                            <dl>{userData.user.displayName}</dl>
                            <dd>Email:</dd>
                            <dl>{userData.user.email}</dl>
                        </dl>
                    </fieldset>
                    <ProtectedElement>
                        <ul>
                            <li><Link to="/restricted/actors">Ir a Actores</Link></li>
                            <li><Link to="/restricted/films">Ir a Films</Link></li>
                        </ul>
                    </ProtectedElement>
                </main>
            }
        </>);
};

export { Dashboard };