import { combineReducers } from 'redux';
import dagHistory from 'redux-dag-history/lib/reducer';
import app from './app';
import history from './history';

export const EXCLUDED_ACTION_NAMES = [
  '@@INIT',
  'INIT',
  'TOGGLE_BRANCH_CONTAINER',
  'SELECT_MAIN_VIEW',
  'RETRIEVE_INITIAL_STATE_IGNORE_THIS_EVENT',
];

const rootReducer = combineReducers({
  app: dagHistory(app, {
    debug: false,
    actionName: state => state.metadata.name,
    actionFilter: actionType => EXCLUDED_ACTION_NAMES.indexOf(actionType) === -1,
  }),
  history,
});

export default rootReducer;
