import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';
import Header from '../Header/Header';

const Actors = () => {

    const { userData } = useContext(UserContext);

    const [actors, setActors] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/actors?limit=15", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userData.token}`,
            },
        }).then(res => res.json().then(data => {
            setActors(data);
        }))
            .catch((err) => console.log(err));
    }, [])

    return (
        <>
            <Header />
            {
                actors?.length &&
                <table>
                    <thead><tr><th>Id</th><th>Nombre</th><th>Apellido</th></tr></thead>
                    <tbody>
                        {actors.map((value, index) => {
                            return <tr key={index}>
                                <td>{value.actorId}</td>
                                <td>{value.firstName}</td>
                                <td>{value.lastName}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            }
        </>);
};

export { Actors };