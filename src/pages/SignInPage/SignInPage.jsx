import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../../context/AuthProvider";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            if (!response.ok) {
                alert('Login Failed!');
            } else {
                const data = await response.json();
                login(data.token);
                navigate('/');
            }
        } catch (error) {
            alert(error);
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="main-container">
            <form onSubmit={handleLogin}>
                <h2>Войти</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <button type="submit">Войти</button>
            </form>
        </div>
);
};

export default Login;