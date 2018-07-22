import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { withMainComponent } from '../hoc';
 
const ProtectedRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
       rest.user.username
         ? <Component {...props} />
         : <Redirect to={{
             pathname: '/account/login',
             state: {from: props.location}
         }} />
    )} />
)

export default withMainComponent(ProtectedRoute);
