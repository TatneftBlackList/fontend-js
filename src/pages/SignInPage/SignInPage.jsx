import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthProvider";
import './SignInPage.css';  // Импортируем стили для страницы

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!username || !password) {
            setError('Username and password are required');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_ADDRESS}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username,
                    password
                }).toString(),
            });

            if (!response.ok) {
                setError('Login Failed!');
            } else {
                const data = await response.json();
                console.log("Bearer " + data.access_token);
                login("Bearer " + data.access_token);
                navigate('/');
            }
        } catch (error) {
            setError('Login failed: ' + error.message);
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-container">
            <h2 className='form__title'>Войти</h2>
            <form className="form__container" onSubmit={handleLogin}>
                {error && <p className="error-message">{error}</p>}
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Войти'}
                </button>
            </form>
        </div>
    );
}

export default Login;
