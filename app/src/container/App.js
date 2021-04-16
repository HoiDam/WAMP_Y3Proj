import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Switch ,Route, Link ,Redirect } from 'react-router-dom'
import PrivateRoute from './privateRoute';

import Welcome from '../welcome.js'
import Login from '../auth/login.js'
import Register from '../auth/register.js'
import Backbone from '../main/backbone.js'
import ConfirmRegister from '../auth/confirmregister.js'

import Error from '../error.js'

function App() {
  return (
    <Router basename="/app" >
     {/* <Router > */}
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/register/confirm" component={ConfirmRegister}/>
        <PrivateRoute path="/main" component={Backbone}/>
        <Route >
          <Error/>
        </Route>
       
      </Switch>
    </Router>
  );
}

export default App;
