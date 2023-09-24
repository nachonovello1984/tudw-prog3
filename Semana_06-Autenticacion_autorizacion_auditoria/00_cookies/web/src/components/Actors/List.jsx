import { useState, useEffect } from "react";


const List = () => {

    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/actors?limit=15")
            .then(res => res.json()
                .then(data => setActors(data.data))
                .catch(err => console.log(err))
            ).catch(err => console.log(err));
    }, []);

    function seleccionar (actorId) {
        fetch(`http://localhost:3001/api/v1/actors/${actorId}/choose`, {
            method : "PUT",
            credentials : "include"
        })
        .then(res => res.json()
                .then(_ => console.log(`Actor ${actorId} seleccionado con éxito!`))
                .catch(err => console.log(err))
            ).catch(err => console.log(err));

        
    };

    return <>
        <h1>Lista de Actores</h1>
        {actors ?
            <table>
                <thead>
                    <tr><td>Id</td><td>Nombre</td><td>Apellido</td><td>Acción</td></tr>
                </thead>
                <tbody>
                    {actors.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.actorId}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td><a onClick={(evt) => seleccionar(item.actorId)}>Seleccionar</a></td>
                        </tr>
                    })}
                </tbody>
            </table>
            : ""
        }
    </>;
};

export default List;