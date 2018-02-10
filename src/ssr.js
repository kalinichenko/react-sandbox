import express from 'express';
import React from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { matchRoutes } from 'react-router-config';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './containers/';
import api from '../api';

import routes from './routes';
import store from './store';

const port = 3000;
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

server.use('/public', express.static('public'));

server.get('*', (req, res) => {
  const context = {}; // This context object contains the results of the render
  const branch = matchRoutes(routes, req.originalUrl);
  const promises = branch.map(({ route, match }) => {
    const { fetchData } = route.component;
    return fetchData instanceof Function ? store.dispatch(fetchData(match)) : Promise.resolve(null);
  });

  return Promise.all(promises).then(() => {
    const sheet = new ServerStyleSheet(); // <-- creating out stylesheet

    const body = renderToString( // eslint-disable-line
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </StyleSheetManager>);

    const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet

    res.send(html({
      body,
      styles,
      preloadedState: store.getState(),
    }));
  });
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`); // eslint-disable-line no-console
