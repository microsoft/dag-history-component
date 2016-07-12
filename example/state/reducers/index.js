import app from './app';
import dagHistory from 'redux-dag-history/lib/reducer';

export const EXCLUDED_ACTION_NAMES = [
  '@@INIT',
  'INIT',
  'RETRIEVE_INITIAL_STATE_IGNORE_THIS_EVENT',
];

const rootReducer = dagHistory(app, {
  debug: false,
  actionName: state => state.metadata.name,
  actionFilter: actionType => EXCLUDED_ACTION_NAMES.indexOf(actionType) === -1,
});
export default rootReducer;
