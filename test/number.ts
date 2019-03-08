import {expect} from 'chai';
import * as fromSeed from 'seedrandom';

import {between, digits} from '../src/number';

describe('digits', () => {
  it('throws for lengths below 0', () => {
    const rng = fromSeed('BANANA');
    expect(() => digits(rng)(0)).to.throw();
    expect(() => digits(rng)(-1)).to.throw();
  });

  it('returns an n-digit number', () => {
    const rng = fromSeed('BANANA');

    for (let n = 1; n < 20; n++) {
      const v = digits(rng)(n);

      expect(Math.abs(v).toString()).to.have.lengthOf(n);
    }
  });
});
