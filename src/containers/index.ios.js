import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Books from './Books';
import Details from './Details';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Books} />
      <Route path="/:id" component={Details} />
    </Switch>
  )
}

export default App;