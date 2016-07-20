const { combineReducers } = require('redux');
import metadata from './metadata';
import visuals from './visuals';

export default combineReducers({ metadata, visuals });
