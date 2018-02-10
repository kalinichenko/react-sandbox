import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { AppContainer } from 'react-hot-loader';
import Promise from 'es6-promise';

import store from './store';
import App from './containers/';

Promise.polyfill();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>
    , document.getElementById('root'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./containers/index.js', () => {
    render();
  });
}
