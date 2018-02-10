import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Books from './Books';
import Details from './Details';

const muiTheme = getMuiTheme({
}, {
  avatar: {
    borderColor: null,
  },
  userAgent: 'all',
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Switch>
      <Route
        exact path="/books"
        component={Books}
      />
      <Route
        path="/books/:id"
        component={Details}
      />
      <Redirect to="books" />
    </Switch>
  </MuiThemeProvider>
);

export default App;
