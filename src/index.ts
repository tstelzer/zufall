import * as fromSeed from 'seedrandom';

import {between, digits} from './number';
import OpenSimplexNoise from './open-simplex-noise';
import {generateAlphabeticSeed} from './seed';

const zufall = (userSeed?: string) => {
  const seed = userSeed || generateAlphabeticSeed(fromSeed())(7);
  const rng = fromSeed(seed);

  return {
    number: rng,
    seed,
    between: between(rng),
    digits: digits(rng),
    noise: new OpenSimplexNoise(rng),
  };
};

export default zufall;
