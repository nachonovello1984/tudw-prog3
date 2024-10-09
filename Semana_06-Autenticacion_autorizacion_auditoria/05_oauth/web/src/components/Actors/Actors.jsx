import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';

const Actors = () => {

    const { userData } = useContext(UserContext);

    const [actors, setActors] = useState(null);

    console.log(userData.token);

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
    }, [userData])

    return (
        (actors?.length > 0) ?
            <table>
                <thead><tr><td>Id</td><td>Nombre</td><td>Apellido</td></tr></thead>
                <tbody>
                    {actors.map((value, index) => {
                        return <tr key={index}>
                            <td>{value.actorId}</td>
                            <td>{value.firstName}</td>
                            <td>{value.lastName}</td>
                        </tr>
                    })}
                </tbody>
            </table> : <></>);
};

export { Actors };