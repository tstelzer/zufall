import * as fromSeed from 'seedrandom';

import {between, digits} from './number';
import openSimplexNoise from './open-simplex-noise';
import {generateAlphabeticSeed} from './seed';

export const zufall = (userSeed?: string) => {
  const seed = userSeed || generateAlphabeticSeed(fromSeed())(7);
  const rng = fromSeed(seed);

  const {noise2D, noise3D, noise4D} = openSimplexNoise(rng);

  return {
    seed,
    number: rng,
    between: between(rng),
    digits: digits(rng),
    noise2D,
    noise3D,
    noise4D,
  };
};

export default zufall;
