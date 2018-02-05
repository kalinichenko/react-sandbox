import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

const middlewares = [
  thunkMiddleware,
  promiseMiddleware(),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const preloadedState = window.__PRELOADED_STATE__
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__


const store = createStore(combineReducers(reducers), preloadedState, composeEnhancers(applyMiddleware(...middlewares)));


if(module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers/index').default;
    store.replaceReducer(combineReducers(nextReducer));
  });
}

export default store;