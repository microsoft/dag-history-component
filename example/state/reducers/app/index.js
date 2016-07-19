import metadata from './metadata';
import visuals from './visuals';
import history from './history';
const { combineReducers } = require('redux');
export default combineReducers({ metadata, visuals, history });
