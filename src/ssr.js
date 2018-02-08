import express from 'express';
import React from 'react';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderToString } from 'react-dom/server';
import {Provider} from 'react-redux';
import App from './containers/';
import api from '../api';
import books from '../api/books';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import { ServerStyleSheet } from 'styled-components';

const port = 4444;
const server = express();
const html = ({ body, styles, preloadedState }) => `
  <html>
    <head>
      ${styles}
    </head>
    <body>
      <div id="root">${body}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/public/bundle.js"></script>
    </body>
  </html>
`;


api(server);

server.use('/public', express.static('public'))

server.get('/', (req, res) => {
  const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
  const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet

  let context = {}; // This context object contains the results of the render

  const preloadedState = {books: {data: books, isFulfilled: true,}}

  const store = createStore(combineReducers(rootReducer), preloadedState);

  const body = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  res.send(
    html({
      body,
      styles,
      preloadedState,
    })
  );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);