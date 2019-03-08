import {expect} from 'chai';
import * as fromSeed from 'seedrandom';

import OpenSimplexNoise from '../src/open-simplex-noise';

describe('noise', () => {
  it('returns values between -1 and 1', () => {
    const noise = new OpenSimplexNoise(fromSeed('BANANA'));

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const value = noise.noise2D(x, y);
        expect(value).to.be.gte(-1);
        expect(value).to.be.lte(1);
      }
    }
  });

  it('is referentially transparent under identical seeds', () => {
    const seeds = ['BANANA', 'APPLE', 'PINEAPPLE', 'ORANGE'];
    for (const seed of seeds) {
      const a = new OpenSimplexNoise(fromSeed(seed)).noise2D(1, 1);
      const b = new OpenSimplexNoise(fromSeed(seed)).noise2D(1, 1);

      expect(a).to.equal(b);
    }
  });

  /**
   * FIXME: Not sure if this is correct, can different seeds return
   * identical values?
   * Maybe a different approach could be to run this against n different seed
   * combination and see _how many_ are identical?
   */
  it('returns different values using different seeds', () => {
    const seedsA = ['BANANA', 'APPLE', 'PINEAPPLE', 'ORANGE'];
    const seedsB = ['MERCEDES', 'HONDA', 'HYUNDAI', 'VW'];

    for (const seedA of seedsA) {
      for (const seedB of seedsB) {
        const a = new OpenSimplexNoise(fromSeed(seedA)).noise2D(1, 1);
        const b = new OpenSimplexNoise(fromSeed(seedB)).noise2D(1, 1);

        expect(a).not.to.equal(b);
      }
    }
  });

  it('returns similar values for similar inputs', () => {
    const noise = new OpenSimplexNoise(fromSeed('BANANA'));
    const a = noise.noise2D(0.1, 0.1);
    const b = noise.noise2D(0.101, 0.101);
    expect(Math.abs(a - b)).to.be.lt(0.1);
  });
});
