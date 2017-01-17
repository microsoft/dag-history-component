import { StateId } from '@essex/redux-dag-history/lib/interfaces';
import * as Actions from 'redux-actions';
import * as DagHistoryActions from '@essex/redux-dag-history/lib/ActionCreators';

// Action Types
export const SELECT_MAIN_VIEW = 'SELECT_MAIN_VIEW';
export const SELECT_HISTORY_TYPE = 'SELECT_HISTORY_TYPE';
export const SELECT_BOOKMARK_DEPTH = 'SELECT_BOOKMARK_DEPTH';
export const TOGGLE_BRANCH_CONTAINER = 'TOGGLE_BRANCH_CONTAINER';
export const START_PLAYBACK = 'START_PLAYBACK';
export const STOP_PLAYBACK = 'STOP_PLAYBACK';
export const BOOKMARK_DRAG_START = 'BOOKMARK_DRAG_START';
export const BOOKMARK_DRAG_HOVER = 'BOOKMARK_DRAG_HOVER';
export const BOOKMARK_DRAG_DROP = 'BOOKMARK_DRAG_DROP';
export const BOOKMARK_DRAG_CANCEL = 'BOOKMARK_DRAG_CANCEL';

// Action Creators
const doSelectBookmarkDepth = Actions.createAction<BookmarkDepthSelection>(SELECT_BOOKMARK_DEPTH);
export const selectMainView = Actions.createAction(SELECT_MAIN_VIEW);
export const selectHistoryType = Actions.createAction<string>(SELECT_HISTORY_TYPE);
export const toggleBranchContainer = Actions.createAction<void>(TOGGLE_BRANCH_CONTAINER);
export const startPlayback = Actions.createAction<void>(START_PLAYBACK);
export const stopPlayback = Actions.createAction<void>(STOP_PLAYBACK);

// Bookmark D&D Action Creators
export const bookmarkDragStart =
  Actions.createAction<BookmarkDragStartPayload>(BOOKMARK_DRAG_START);
export const bookmarkDragHover =
  Actions.createAction<BookmarkDragHoverPayload>(BOOKMARK_DRAG_HOVER);
const doBookmarkDragDrop = Actions.createAction<void>(BOOKMARK_DRAG_DROP);
export const bookmarkDragCancel = Actions.createAction<void>(BOOKMARK_DRAG_CANCEL);

export function bookmarkDragDrop(payload: BookmarkDragDropPayload) {
  return (dispatch) => {
    dispatch(doBookmarkDragDrop());
    dispatch(DagHistoryActions.moveBookmark({
      from: payload.index,
      to: payload.droppedOn,
    }));
  };
}

export const selectBookmarkDepth = (payload: BookmarkDepthAndStateSelection) => {
  const {
    bookmarkIndex,
    depth,
    state,
  } = payload;
  return (dispatch) => {
    dispatch(doSelectBookmarkDepth({ bookmarkIndex, depth }));
    dispatch(DagHistoryActions.jumpToState(state));
  };
};

export const selectBookmark = (bookmarkIndex: number, state: StateId) => (
  selectBookmarkDepth({
    bookmarkIndex,
    depth: undefined,
    state,
  })
);

export interface BookmarkDragStartPayload {
  index: number;
}

export interface BookmarkDragHoverPayload {
  index: number;
}

export interface BookmarkDragDropPayload {
  index: number;
  droppedOn: number;
}

export interface BookmarkDepthSelection {
  bookmarkIndex?: number;
  depth?: number;
}

export interface BookmarkDepthAndStateSelection {
  bookmarkIndex: number;
  depth: number;
  state: StateId;
}
