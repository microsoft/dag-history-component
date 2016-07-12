import * as Actions from '../../Actions';

const DEFAULT_STATE = {
  name: 'INIT',
  historyIndex: 0,
};

export default function reduce(state = DEFAULT_STATE, action) {
  if (action.type === Actions.INCREMENT) {
    return { name: 'Increment Value', historyIndex: state.historyIndex + 1 };
  } else if (action.type === Actions.DECREMENT) {
    return { name: 'Decrement Value', historyIndex: state.historyIndex + 1 };
  } else if (action.type === Actions.PICK_RANDOM_COLOR) {
    return { name: 'Pick Random Color', historyIndex: state.historyIndex + 1 };
  }
  return state;
}
