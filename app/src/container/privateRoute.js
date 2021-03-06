import React from 'react';  
import { Redirect, Route } from 'react-router-dom';
import { checkCookie } from '../utils/cookies';

const PrivateRoute = ({ component: Component, ...rest }) => (  
  <Route { ...rest } render={
    
    props => (
    checkCookie() == null ? (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}
    />
      
    ) : (
      <Component { ...props } />
    )
  )} />
);

export default PrivateRoute;