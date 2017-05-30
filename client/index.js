import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

import './assets/css/custom.scss';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/material-icons/css/material-icons.css';
import '../node_modules/sweetalert/dist/sweetalert.min';
import '../node_modules/sweetalert/dist/sweetalert.css';


import routes from './routes';
import ConfigureStore from './store/ConfigureStore';
import setAuthorizationToken from './utils/authorization';
import { setCurrentUser } from './actions/AuthAction';

const store = ConfigureStore();
const token = localStorage.jwtToken;

if (token) {
  setAuthorizationToken(token);
  const details = jwtDecode(token);
  store.dispatch(setCurrentUser(details.user));
}

render(<Provider store={store}>
  <Router history={browserHistory} routes={routes} />
</Provider>, document.getElementById('mail-app'));
