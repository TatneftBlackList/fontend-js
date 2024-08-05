import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };
    const saveRoleToLocalStorage = (role) => {
        setRole(role);
        localStorage.setItem('role', role);
    };

    const saveRefreshTokenToLocalStorage = (refreshToken) => {
        setRefreshToken(refreshToken);
        localStorage.setItem('refreshToken', refreshToken);
    };


    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout, saveRoleToLocalStorage, saveRefreshTokenToLocalStorage }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
