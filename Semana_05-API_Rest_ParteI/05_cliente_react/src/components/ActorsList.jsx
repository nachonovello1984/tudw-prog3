import { useState, useEffect } from "react";
import "./ActorsList.module.css";

const ActorsList = () => {
    const [actors, setActors] = useState([]);

    const formatearFecha = (dateStr) => {
        // Crear un objeto Date a partir de la cadena
        const date = new Date(dateStr);

        // Opciones de formato personalizadas
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, 
        };

        // Formatear la fecha
        return new Intl.DateTimeFormat('es-AR', options).format(date);
    }

    const findAll = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/actors?order=lastName&asc=true&limit=50&offset=0");
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
            }
            const result = await res.json();
            setActors(result);
        } catch (exc) {
            console.log(exc.toString());
        }
    };

    useEffect(() => {
        const findAllWrapper = async () => { await findAll(); }
        findAllWrapper();
    }, []);

    return <table>
        <thead>
            <tr><th>Id</th><th>First Name</th><th>Last Name</th><th>Last Update</th></tr>
        </thead>
        <tbody>
            {actors.map(a =>
                <tr key={a.actorId}>
                    <td>{a.actorId}</td>
                    <td>{a.firstName}</td>
                    <td>{a.lastName}</td>
                    <td>{formatearFecha(a.lastUpdate)}</td></tr>
            )}
        </tbody>
    </table>
};

export default ActorsList;

