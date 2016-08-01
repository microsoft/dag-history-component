// const log = require('debug')('dag-history-component:reducer');
import {
  SELECT_MAIN_VIEW,
  TOGGLE_BRANCH_CONTAINER,
} from './actions';

const INITIAL_STATE = {
  mainView: 'history',
  branchContainerExpanded: true,
};

export default function (config) {
  return function reduce(state = INITIAL_STATE, action) {
    let result = state;
    if (action.type === SELECT_MAIN_VIEW) {
      result = { ...state, mainView: action.payload };
    } else if (action.type === TOGGLE_BRANCH_CONTAINER) {
      result = { ...state, branchContainerExpanded: !state.branchContainerExpanded };
    } else if (action.type.indexOf('DAG_HISTORY_') !== 0 && config.actionFilter(action)) {
      // Insertable actions clear the pinned state
      result = { ...state };
    }
    return result;
  };
}
