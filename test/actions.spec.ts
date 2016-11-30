import { expect } from 'chai';
import * as actions from '../src/actions';

describe('The Actions Module', () => {
  it('contains action constants', () => {
    expect(actions.SELECT_MAIN_VIEW).to.be.a("string");
    expect(actions.TOGGLE_BRANCH_CONTAINER).to.be.a("string");
  });

  it('has action creators that emit FSA-compliant actions', () => {
    expect(actions.selectMainView('derp')).to.deep.equal({
      type: actions.SELECT_MAIN_VIEW,
      payload: 'derp',
    });
    expect(actions.toggleBranchContainer()).to.deep.equal({
      type: actions.TOGGLE_BRANCH_CONTAINER,
    });
  });
});
