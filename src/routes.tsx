import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './features/Dashboard';
import Login from './features/Login';

export default function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
