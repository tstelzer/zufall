import * as seedrandom from 'seedrandom';

import {between, digits} from './number';
import openSimplexNoise from './open-simplex-noise';
import {alphabetic} from './seed';

export const zufall = (userSeed?: string) => {
  const seed = userSeed || alphabetic(seedrandom())(7);
  const prng = seedrandom(seed);

  const {noise2D, noise3D, noise4D} = openSimplexNoise(prng);

  return {
    seed,
    number: prng,
    between: between(prng),
    digits: digits(prng),
    noise2D,
    noise3D,
    noise4D,
  };
};

export default zufall;
