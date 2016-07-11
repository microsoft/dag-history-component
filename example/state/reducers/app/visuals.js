import * as ReduxActions from "redux-actions";
import * as Actions from "../../Actions";
import * as _ from "lodash";

const INITIAL_STATE = {
  value: 0,
  color: "#FF",
};

export default function reduce(state = INITIAL_STATE, action) {
    if (action.type === Actions.INCREMENT) {
      return { ...state, value: state.value + 1 };
    } else if (action.type === Actions.DECREMENT) {
      return { ...state, value: state.value - 1 };
    } else if (action.type == Actions.PICK_RANDOM_COLOR) {
      return { ...state, color: randomColor() };
    }
    return state;
}

function randomColor() {
    return "#" + (Math.random()*0xFFFFFF<<0).toString(16);
}
