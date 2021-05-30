import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import PageNotFound from '../pages/PageNotFound';

const Router = () => (
  <Switch>
    {routes.map((route) => (
      <Route
        key={route.key}
        path={route.path}
        exact={route.exact}
        render={(props) => <route.component {...props} />}
      />
    ))}
    <Route component={PageNotFound} />
  </Switch>
);

export default Router;