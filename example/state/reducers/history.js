import {
  SELECT_MAIN_VIEW,
  TOGGLE_BRANCH_CONTAINER,
} from '../../../src/actions';

const INITIAL_STATE = {
  mainView: 'history',
  branchContainerExpanded: true,
};

export default function reduce(state = INITIAL_STATE, action) {
  let result = state;
  if (action.type === SELECT_MAIN_VIEW) {
    result = { ...state, mainView: action.payload };
  } else if (action.type === TOGGLE_BRANCH_CONTAINER) {
    result = { ...state, branchContainerExpanded: !state.branchContainerExpanded };
  }
  return result;
}
