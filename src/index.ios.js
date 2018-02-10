import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';

import App from './containers/';
import store from './store';

export default () => (
  <Provider store={store}>
    <NativeRouter>
      <App />
    </NativeRouter>
  </Provider>
);
