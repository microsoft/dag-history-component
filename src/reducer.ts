import {
  SELECT_MAIN_VIEW,
  SELECT_HISTORY_TYPE,
  TOGGLE_BRANCH_CONTAINER,
} from './actions';

const INITIAL_STATE = {
  mainView: 'history',
  historyType: 'branched',
  branchContainerExpanded: true,
};

export default function (config) {
  return function reduce(state = INITIAL_STATE, action) {
    let result = state;
    if (action.type === SELECT_MAIN_VIEW) {
      result = { ...state, mainView: action.payload };
    } else if (action.type === SELECT_HISTORY_TYPE) {
      result = { ...state, historyType: action.payload };
    } else if (action.type === TOGGLE_BRANCH_CONTAINER) {
      result = { ...state, branchContainerExpanded: !state.branchContainerExpanded };
    } else if (action.type.indexOf('DAG_HISTORY_') !== 0 && config.actionFilter(action.type)) {
      // Insertable actions clear the pinned state
      result = { ...state, mainView: 'history' };
    }
    return result;
  };
}
