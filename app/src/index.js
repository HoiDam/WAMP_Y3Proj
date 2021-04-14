import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './container/App';
import configureStore from './store/configureStore';

import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

var myStorage = window.localStorage;

// localStorage.setItem('BackendURL', 'http://localhost:80/php/public');
localStorage.setItem('BackendURL', 'http://'+window.location.hostname+'/php/public');
localStorage.setItem('FrontendURL', 'http://localhost:3000');
console.log(localStorage.getItem("BackendURL"))
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
