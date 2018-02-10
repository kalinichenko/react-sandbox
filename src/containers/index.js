import React from 'react';
import {
  Route,
  Switch,
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
        exact path="/"
        component={Books}
      />
      <Route
        path="/:id"
        component={Details}
      />
    </Switch>
  </MuiThemeProvider>
);

export default App;
