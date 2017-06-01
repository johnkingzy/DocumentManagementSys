import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import requireAuthentication from './utils/RequreAuthentication';
import requireAdminAuthentication from './utils/RequireAdminAccess';
// import adminAuthentication from './utils/AdminAuthentication';
import DashBoard from './components/DashBoard';
import HomePage from './components/HomePage';
import AdminPanel from './components/adminpanel/AdminPanel';

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
    <Route path="admin" components={requireAdminAuthentication(AdminPanel)} />
  </Route>
);
