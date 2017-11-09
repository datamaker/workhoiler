// React Package
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Login, Register, Wall } from '../../containers';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="wall/:username" component={Wall} />
  </Route>
);

export default routes;
