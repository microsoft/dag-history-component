import { expect } from 'chai';
import makeReducer from '../../../src/state/reducers/dragDrop';

import {
  bookmarkDragStart,
  bookmarkDragHover,
  bookmarkDragDrop,
  bookmarkDragCancel,
} from '../../../src/state/actions/creators';
import * as types from '../../../src/state/actions/types';

const defaultConfig = {
  actionFilter: () => false,
};

describe('The DragDrop reducer', () => {
  it('will emit an initial dragDrop state', () => {
    const state = makeReducer(defaultConfig)(undefined, { type: 'derp' });
    expect(state).to.deep.equal({
      sourceIndex: undefined,
      hoverIndex: undefined,
    });
  });

  it('can handle a dragStart event', () => {
    let state = undefined;
    const reduce = makeReducer(defaultConfig);
    state = reduce(state, { type: 'derp' });
    state = reduce(state, bookmarkDragStart({ index: 3 }));
    expect(state).to.deep.equal({
      sourceIndex: 3,
      hoverIndex: undefined,
    });
  });

  it('can handle a dragHover event', () => {
    let state = undefined;
    const reduce = makeReducer(defaultConfig);
    state = reduce(state, { type: 'derp' });
    state = reduce(state, bookmarkDragStart({ index: 3 }));
    state = reduce(state, bookmarkDragHover({ index: 4 }));
    expect(state).to.deep.equal({
      sourceIndex: 3,
      hoverIndex: 4,
    });
  });

  it('can handle a dragDrop event', () => {
    let state = undefined;
    const reduce = makeReducer(defaultConfig);
    state = reduce(state, { type: 'derp' });
    state = reduce(state, bookmarkDragStart({ index: 3 }));
    state = reduce(state, bookmarkDragHover({ index: 4 }));
    state = reduce(state, { type: types.BOOKMARK_DRAG_DROP });

    expect(state).to.deep.equal({
      sourceIndex: undefined,
      hoverIndex: undefined,
    });
  });

  it('can handle a dragCancel event', () => {
    let state = undefined;
    const reduce = makeReducer(defaultConfig);
    state = reduce(state, { type: 'derp' });
    state = reduce(state, bookmarkDragStart({ index: 3 }));
    state = reduce(state, bookmarkDragHover({ index: 4 }));
    state = reduce(state, { type: types.BOOKMARK_DRAG_CANCEL });

    expect(state).to.deep.equal({
      sourceIndex: undefined,
      hoverIndex: undefined,
    });
  });
});
