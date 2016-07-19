import { createAction } from 'redux-actions';

export const SELECT_MAIN_VIEW = 'SELECT_MAIN_VIEW';
export const SELECT_UNDER_VIEW = 'SELECT_UNDER_VIEW';

export const selectMainView = createAction(SELECT_MAIN_VIEW);
export const selectUnderView = createAction(SELECT_UNDER_VIEW);
