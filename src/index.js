import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import App from './containers/App';
import {Provider} from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';

const render = () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  , document.getElementById('root'));
};

render();

