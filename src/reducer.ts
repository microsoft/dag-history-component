import {
  IConfiguration, // eslint-disable-line no-unused-vars
} from 'redux-dag-history/lib/interfaces';
import {
  SELECT_MAIN_VIEW,
  SELECT_HISTORY_TYPE,
  TOGGLE_BRANCH_CONTAINER,
  SELECT_BOOKMARK_DEPTH,
  START_PLAYBACK,
  STOP_PLAYBACK,
} from './actions';

const INITIAL_STATE = {
  mainView: 'history',
  historyType: 'branched',
  branchContainerExpanded: true,
  isPlayingBack: false,
  selectedBookmark: undefined,
  selectedBookmarkDepth: undefined,
};

export default function (config: IConfiguration<any>) {
  return function reduce(state = INITIAL_STATE, action) {
    let result = state;
    if (action.type === SELECT_MAIN_VIEW) {
      result = {
        ...state,
        mainView: action.payload,
      };
    } else if (action.type === SELECT_HISTORY_TYPE) {
      result = {
        ...state,
        historyType: action.payload,
      };
    } else if (action.type === TOGGLE_BRANCH_CONTAINER) {
      result = {
        ...state,
        branchContainerExpanded: !state.branchContainerExpanded,
      };
    } else if (action.type === SELECT_BOOKMARK_DEPTH) {
      result = {
        ...state,
        selectedBookmark: action.payload.bookmarkIndex,
        selectedBookmarkDepth: action.payload.depth,
      };
    } else if (action.type === START_PLAYBACK) {
      result = {
        ...state,
        isPlayingBack: true,
        selectedBookmark: 0,
        selectedBookmarkDepth: 0,
      };
    } else if (action.type === STOP_PLAYBACK) {
      result = {
        ...state,
        isPlayingBack: false,
        selectedBookmark: undefined,
        selectedBookmarkDepth: undefined,
      };
    } else if (action.type.indexOf('DAG_HISTORY_') !== 0 && config.actionFilter(action.type)) {
      // Insertable actions clear the pinned state
      result = {
        ...state,
        mainView: 'history',
        selectedBookmark: undefined,
        selectedBookmarkDepth: undefined,
      };
    }
    return result;
  };
}
