import * as seedrandom from 'seedrandom';

import {between, digits} from './number';
import OpenSimplexNoise from './open-simplex-noise';
import {alphanumeric} from './seed';

const zufall = (userSeed?: string) => {
  const seed = userSeed || alphanumeric(7);
  const rng = seedrandom(seed);

  return {
    number: rng,
    seed,
    between: between(rng),
    digits: digits(rng),
    noise: new OpenSimplexNoise(rng),
  };
};

export default zufall;
