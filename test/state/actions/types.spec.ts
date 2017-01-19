import { expect } from 'chai';
import * as types from '../../../src/state/actions/types';

describe('Action Types', () => {
  it('should all be strings', () => {
    for (let key in types) {
      expect(types[key]).to.be.a('string', key);
    }
  });
});
