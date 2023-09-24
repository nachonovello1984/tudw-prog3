import { useState, useEffect } from "react";

const Chosen = () => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/v1/actors/chosen", { 
                method: "GET", 
                credentials : "include"
            })
            .then(res => res.json()
                .then(response => {
                    if (response.status != "OK") {
                        console.log(response.data.error);
                        return;
                    }
                    setActors(response.data);
                })
                .catch(err => console.log(err))
            ).catch(err => console.log(err));
    }, []);

    return <>
        <h1>Actores seleccionados</h1>
        {actors ?
            <table>
                <thead>
                    <tr><td>Id</td><td>Nombre</td><td>Apellido</td></tr>
                </thead>
                <tbody>
                    {actors.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.actorId}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            : ""
        }
    </>
};

export default Chosen;