import {expect} from 'chai';
import * as fromSeed from 'seedrandom';

import {between, digits} from '../src/number';

describe('digits', () => {
  it('throws for lengths below 0', () => {
    const rng = fromSeed();
    expect(() => digits(rng)(0)).to.throw();
    expect(() => digits(rng)(-1)).to.throw();
  });

  it('returns an n-digit number', () => {
    const rng = fromSeed();

    for (let n = 1; n < 20; n++) {
      const v = digits(rng)(n);

      expect(Math.abs(v).toString()).to.have.lengthOf(n);
    }
  });
});

describe('between', () => {
  it('returns numbers between min and max values', () => {
    const rng = fromSeed();
    for (let _ = 0; _ < 100; _++) {
      expect(between(rng)(-100, 100))
        .to.be.gte(-100)
        .to.be.lte(100);

      expect(between(rng)(100, -100))
        .to.be.gte(-100)
        .to.be.lte(100);
    }
  });
});
