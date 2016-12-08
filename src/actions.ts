import { StateId } from 'redux-dag-history/lib/interfaces';
import * as Actions from 'redux-actions';
import { jumpToState } from 'redux-dag-history/lib/ActionCreators';

// Action Types
export const SELECT_MAIN_VIEW = 'SELECT_MAIN_VIEW';
export const SELECT_HISTORY_TYPE = 'SELECT_HISTORY_TYPE';
export const SELECT_BOOKMARK_DEPTH = 'SELECT_BOOKMARK_DEPTH';
export const TOGGLE_BRANCH_CONTAINER = 'TOGGLE_BRANCH_CONTAINER';
export const START_PLAYBACK = 'START_PLAYBACK';
export const STOP_PLAYBACK = 'STOP_PLAYBACK';

// Action Creators
const doSelectBookmarkDepth = Actions.createAction<BookmarkDepthSelection>(SELECT_BOOKMARK_DEPTH);
export const selectMainView = Actions.createAction(SELECT_MAIN_VIEW);
export const selectHistoryType = Actions.createAction<string>(SELECT_HISTORY_TYPE);
export const toggleBranchContainer = Actions.createAction<void>(TOGGLE_BRANCH_CONTAINER);
export const startPlayback = Actions.createAction<void>(START_PLAYBACK);
export const stopPlayback = Actions.createAction<void>(STOP_PLAYBACK);

export const selectBookmarkDepth = (payload: BookmarkDepthAndStateSelection) => {
  const {
    bookmarkIndex,
    depth,
    state,
  } = payload;
  return (dispatch) => {
    dispatch(doSelectBookmarkDepth({ bookmarkIndex, depth }));
    dispatch(jumpToState(state));
  };
};

export const selectBookmark = (bookmarkIndex: number, state: StateId) => (
  selectBookmarkDepth({
    bookmarkIndex,
    depth: undefined,
    state,
  })
);

export interface BookmarkDepthSelection {
  bookmarkIndex?: number;
  depth?: number;
}

export interface BookmarkDepthAndStateSelection {
  bookmarkIndex: number;
  depth: number;
  state: StateId;
}
