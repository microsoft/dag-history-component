import * as actions from "redux-actions";
import { createAction } from 'redux-actions';

// Action Types
export const SELECT_MAIN_VIEW = 'SELECT_MAIN_VIEW';
export const SELECT_HISTORY_TYPE = 'SELECT_HISTORY_TYPE';
export const TOGGLE_BRANCH_CONTAINER = 'TOGGLE_BRANCH_CONTAINER';

// Action Creators
export const selectMainView = createAction(SELECT_MAIN_VIEW);
export const selectHistoryType = createAction(SELECT_HISTORY_TYPE);
export const toggleBranchContainer = createAction(TOGGLE_BRANCH_CONTAINER);
