import React from 'react';
import { Route, Switch } from 'react-router-native';
import Books from './Books';
import Details from './Details';

const App = () => (
  <Switch>
    <Route
      exact path="/"
      component={Books}
    />
    <Route
      path="/:id"
      component={Details}
    />
  </Switch>
);

export default App;
