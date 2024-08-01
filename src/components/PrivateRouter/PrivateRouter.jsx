import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthProvider";


const PrivateRoute = ({ element: Component, ...rest }) => {
    const { token } = useContext(AuthContext);
    console.log({token})
    return (
        <Route
            {...rest}
            element={token ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
