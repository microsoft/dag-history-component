import {
  IConfiguration, // eslint-disable-line no-unused-vars
} from '@essex/redux-dag-history/lib/interfaces';
import {
  BOOKMARK_DRAG_START,
  BOOKMARK_DRAG_HOVER,
  BOOKMARK_DRAG_DROP,
  BOOKMARK_DRAG_CANCEL,
} from '../actions/types';

export const INITIAL_STATE = {
  sourceIndex: undefined,
  hoverIndex: undefined,
};

export default function makeReducer(config: IConfiguration<any>) {
  return function reduce(state = INITIAL_STATE, action) {
    let result = state;
    if (action.type === BOOKMARK_DRAG_START) {
      result = {
        ...state,
        sourceIndex: action.payload.index,
      };
    } else if (action.type === BOOKMARK_DRAG_HOVER) {
      result = {
        ...state,
        hoverIndex: action.payload.index,
      };
    } else if (action.type === BOOKMARK_DRAG_DROP) {
      result = {
        ...state,
        sourceIndex: undefined,
        hoverIndex: undefined,
      };
    } else if (action.type === BOOKMARK_DRAG_CANCEL) {
      result = {
        ...state,
        sourceIndex: undefined,
        hoverIndex: undefined,
      };
    } else if (action.type.indexOf('DAG_HISTORY_') !== 0 && config.actionFilter(action.type)) {
      // Insertable actions clear the pinned state
      result = {
        ...state,
        sourceIndex: undefined,
        hoverIndex: undefined,
      };
    }
    return result;
  };
}
