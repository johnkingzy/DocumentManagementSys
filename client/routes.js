import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import requireAuthentication from './utils/RequreAuthentication';
// import redirectUser from './utils/RedirectUser';
// import HomePage from './components/home';
import DashBoard from './components/DashBoard';
// import ConfigureStore from './store/ConfigureStore';
import HomePage from './components/HomePage';

// const store = ConfigureStore();
// const initialState = store.getState();
// const requireAuth = (nextState, replaceState) => {
//   const auth = initialState.Auth.isAuthenticated;
//   if (auth) {
//     replaceState('/dashboard');
//   }
// };
const requireAuth = (nextState, replace) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    replace('/');
  }
};

export default (
  <Route path="/" components={App}>
    <IndexRoute component={requireAuthentication(DashBoard)} />
    <Route path="dashboard" components={requireAuthentication(DashBoard)} />
    <Route path="login" onEnter={requireAuth} components={HomePage} />
  </Route>
);
