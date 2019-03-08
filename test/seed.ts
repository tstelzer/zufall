import {expect} from 'chai';
import * as fromSeed from 'seedrandom';

import {alphabetic} from '../src/seed';

describe('alphabetic', () => {
  it('throws when length is less than 0', () => {
    const rng = fromSeed();
    expect(() => alphabetic(rng)(-1)).to.throw();
    expect(() => alphabetic(rng)(0)).to.throw();
  });

  it('returns alphabetic strings with length n', () => {
    const rng = fromSeed();
    for (let n = 1; n < 21; n++) {
      expect(alphabetic(rng)(n)).to.have.lengthOf(n);
    }
  });
});
