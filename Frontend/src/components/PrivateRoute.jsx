import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import isLogin from '../utils/isLogin';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Route path="/" element={<Navigate replace to="/login"/>} />
        )} />
    );
};

export default PrivateRoute;