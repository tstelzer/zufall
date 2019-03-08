import {expect} from 'chai';
import * as fromSeed from 'seedrandom';

import {openSimplexNoise} from '../src/open-simplex-noise';

describe('openSimplexNoise', () => {
  it('returns values between -1 and 1', () => {
    const {noise2D, noise3D, noise4D} = openSimplexNoise(fromSeed('BANANA'));

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const a2D = noise2D(x, y);
        expect(a2D).to.be.gte(-1);
        expect(a2D).to.be.lte(1);

        for (let z = 0; z < 10; z++) {
          const a3D = noise3D(x, y, z);
          expect(a3D).to.be.gte(-1);
          expect(a3D).to.be.lte(1);

          for (let w = 0; w < 10; w++) {
            const a4D = noise4D(x, y, z, w);
            expect(a4D).to.be.gte(-1);
            expect(a4D).to.be.lte(1);
          }
        }
      }
    }
  });

  it('is referentially transparent under identical seeds', () => {
    const seeds = ['BANANA', 'APPLE', 'PINEAPPLE', 'ORANGE'];
    for (const seed of seeds) {
      const {noise2D, noise3D, noise4D} = openSimplexNoise(fromSeed(seed));

      const a2D = noise2D(1, 1);
      const b2D = noise2D(1, 1);
      expect(a2D).to.equal(b2D);

      const a3D = noise3D(1, 1, 1);
      const b3D = noise3D(1, 1, 1);
      expect(a3D).to.equal(b3D);

      const a4D = noise4D(1, 1, 1, 1);
      const b4D = noise4D(1, 1, 1, 1);
      expect(a4D).to.equal(b4D);
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

    let a2D = [];
    let b2D = [];

    let a3D = [];
    let b3D = [];

    let a4D = [];
    let b4D = [];

    for (const seedA of seedsA) {
      for (const seedB of seedsB) {
        const {
          noise2D: noise2DA,
          noise3D: noise3DA,
          noise4D: noise4DA,
        } = openSimplexNoise(fromSeed(seedA));

        const {
          noise2D: noise2DB,
          noise3D: noise3DB,
          noise4D: noise4DB,
        } = openSimplexNoise(fromSeed(seedB));

        a2D.push(noise2DA(1, 2));
        b2D.push(noise2DB(1, 2));

        a3D.push(noise3DA(1, 2, 3));
        b3D.push(noise3DB(1, 2, 3));

        a4D.push(noise4DA(1, 2, 3, 4));
        b4D.push(noise4DB(1, 2, 3, 4));
      }
    }

    expect(a2D).not.to.deep.equal(b2D);
    expect(a3D).not.to.deep.equal(b3D);
    expect(a4D).not.to.deep.equal(b4D);
  });

  it('returns similar values for similar inputs', () => {
    const {noise2D, noise3D, noise4D} = openSimplexNoise(fromSeed('BANANA'));

    const a2D = noise2D(0.1, 0.2);
    const b2D = noise2D(0.101, 0.201);
    expect(Math.abs(a2D - b2D)).to.be.lt(0.1);

    const a3D = noise3D(0.1, 0.2, 0.3);
    const b3D = noise3D(0.101, 0.201, 0.301);
    expect(Math.abs(a3D - b3D)).to.be.lt(0.1);

    const a4D = noise4D(0.1, 0.2, 0.3, 0.4);
    const b4D = noise4D(0.101, 0.201, 0.301, 0.401);
    expect(Math.abs(a4D - b4D)).to.be.lt(0.1);
  });
});
