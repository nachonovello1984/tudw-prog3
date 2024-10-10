import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext/UserContext';
import { jwtDecode } from "jwt-decode";
import Header from '../Header/Header';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);
    const [formLogin, setFormLogin] = useState({ username: "", password: "" });

    function doLogin(evt) {
        evt.preventDefault();
        fetch("http://localhost:3001/api/v1/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formLogin)
        })
            .then(res => res.json()
                .then(res => {
                    setUserData({ user: jwtDecode(res.token), token: res.token });
                    localStorage.setItem("user", JSON.stringify({ user: jwtDecode(res.token), token: res.token }));
                    navigate('/restricted/dashboard');
                })
                .catch(err => console.log(err)))
            .catch(err => console.log(err))
    }

    return <>
        <Header />
        <main>
            <h2>Inicio de sesión</h2>
            <form onSubmit={(evt) => doLogin(evt)}>
                <fieldset>
                    <div className="row">
                        <label htmlFor="username">Nombre de Usuario:</label>
                        <input id="username"
                            type="text"
                            autoFocus={true}
                            value={formLogin.username}
                            onChange={(evt) => setFormLogin({ ...formLogin, username: evt.target.value })} />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Contraseña:</label>
                        <input id="password"
                            type="password"
                            value={formLogin.password}
                            onChange={(evt) => setFormLogin({ ...formLogin, password: evt.target.value })} />
                    </div>
                </fieldset>
                <input type="submit" className="btn" value="Enviar" />
            </form>
        </main>
    </>;

};

export { Login };