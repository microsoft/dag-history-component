import { combineReducers } from 'redux';
import dagHistory from 'redux-dag-history/lib/reducer';
import app from './app';
import history from '../../../src/reducer';

export const EXCLUDED_ACTION_NAMES = [
  '@@INIT',
  'INIT',
  'TOGGLE_BRANCH_CONTAINER',
  'SELECT_MAIN_VIEW',
  'RETRIEVE_INITIAL_STATE_IGNORE_THIS_EVENT',
  'HIGHLIGHT_SUCCESSORS',
];

const DAG_HISTORY_CONFIG = {
  debug: false,
  actionName: state => state.metadata.name,
  actionFilter: actionType => EXCLUDED_ACTION_NAMES.indexOf(actionType) === -1,
};

const rootReducer = combineReducers({
  app: dagHistory(app, DAG_HISTORY_CONFIG),
  history: history(DAG_HISTORY_CONFIG),
});

export default rootReducer;
