import { createAction } from 'redux-actions';

// Action Types
export const SELECT_MAIN_VIEW = 'SELECT_MAIN_VIEW';
export const TOGGLE_BRANCH_CONTAINER = 'TOGGLE_BRANCH_CONTAINER';
export const HIGHLIGHT_SUCCESSORS = 'HIGHLIGHT_SUCCESSORS';

// Action Creators
export const selectMainView = createAction(SELECT_MAIN_VIEW);
export const toggleBranchContainer = createAction(TOGGLE_BRANCH_CONTAINER);
export const highlightSuccessors = createAction(HIGHLIGHT_SUCCESSORS);
