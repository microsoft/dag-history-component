import * as redux from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import reducers from './reducers';

const createStoreWithMiddleware = redux.compose(
  redux.applyMiddleware(thunk, createLogger()),
  redux.applyMiddleware(routerMiddleware(hashHistory)),
)(redux.createStore);

export default createStoreWithMiddleware(reducers);
