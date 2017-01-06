import * as redux from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import reducers from './reducers';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || redux.compose;
const logger = createLogger();
const createStoreWithMiddleware = composeEnhancers(
  redux.applyMiddleware(thunk),
  redux.applyMiddleware(routerMiddleware(hashHistory)),
)(redux.createStore);

export default createStoreWithMiddleware(reducers);
