import * as redux from "redux";
import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import reducers from './reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, createLogger()),
  applyMiddleware(routerMiddleware(hashHistory))
)(createStore);

export default createStoreWithMiddleware(reducers);
