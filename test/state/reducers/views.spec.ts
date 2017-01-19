import { expect } from 'chai';
import { default as makeReducer, INITIAL_STATE } from '../../../src/state/reducers/views';

import {
  selectMainView,
  selectHistoryType,
  toggleBranchContainer,
} from '../../../src/state/actions/creators';
import * as types from '../../../src/state/actions/types';

const defaultConfig = {
  actionFilter: () => false,
};

describe('The Views reducer', () => {
  it('will emit an initial dragDrop state', () => {
    const state = makeReducer(defaultConfig)(undefined, { type: 'derp' });
    expect(state).to.deep.equal(INITIAL_STATE);
  });

  it('can handle a selectMainView event', () => {
    let state = undefined;
    const reduce = makeReducer(defaultConfig);
    state = reduce(state, selectMainView('bookmarks'));
    expect(state).to.deep.equal({
      ...INITIAL_STATE,
      mainView: 'bookmarks',
    });
  });

  it('can handle a selectHistoryType event', () => {
    let state = undefined;
    const reduce = makeReducer(defaultConfig);
    state = reduce(state, selectHistoryType('derp'));
    expect(state).to.deep.equal({
      ...INITIAL_STATE,
      historyType: 'derp',
    });
  });

  it('can handle a toggleBranchContainer event', () => {
    let state = undefined;
    const reduce = makeReducer(defaultConfig);
    state = reduce(state, { type: 'derp' });
    expect(state.branchContainerExpanded).to.be.true;

    state = reduce(state, toggleBranchContainer({ index: 3 }));
    expect(state.branchContainerExpanded).to.be.false;

    state = reduce(state, toggleBranchContainer({ index: 3 }));
    expect(state.branchContainerExpanded).to.be.true;
  });
});
