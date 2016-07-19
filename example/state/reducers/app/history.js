import {
  SELECT_MAIN_VIEW,
  SELECT_UNDER_VIEW,
} from '../../../../src/actions';
const INITIAL_STATE = {
  mainView: 'history',
  underView: 'branches',
};

export default function reduce(state = INITIAL_STATE, action) {
  let result = state;
  if (action.type === SELECT_UNDER_VIEW) {
    result = { ...state, underView: action.payload };
  } else if (action.type === SELECT_MAIN_VIEW) {
    result = { ...state, mainView: action.payload };
  }
  return result;
}
