const log = require("debug")("HistoryVisual:Actions");
import * as DagHistoryActions from "redux-dag-history/lib/ActionCreators";
import * as ReduxActions from "redux-actions";
const {
    undo: doUndo,
    redo: doRedo,
    clear: doClear,
    jumpToState: doJumpToState,
    jumpToBranch: doJumpToBranch,
    squash: doSquash,
    createBranch: doCreateBranch,
} = DagHistoryActions;

export const PICK_RANDOM_COLOR = "PICK_RANDOM_COLOR";
export const INCREMENT = "INCREMENT_VALUE";
export const DECREMENT = "DECREMENT_VALUE";
export const pickRandomColor = ReduxActions.createAction(PICK_RANDOM_COLOR);
export const increment = ReduxActions.createAction(INCREMENT);
export const decrement = ReduxActions.createAction(DECREMENT);

export function undo() {
    log("Triggering Undo");
    return doUndo();
}

export function redo() {
    log("Triggering Redo");
    return doRedo();
}

export function jumpToState(id) {
    log("Jumping to State", id);
    return doJumpToState(id);
}

export function jumpToBranch(branch) {
    log("Jumping to Branch", branch);
    return doJumpToBranch(branch);
}

export function clear() {
    return doClear();
}

export function squash() {
    return doSquash();
}

export function createBranch(name) {
    return doCreateBranch(name);
}
