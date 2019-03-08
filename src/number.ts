import * as T from './types';

/**
 * Returns an `n`-digit number.
 */
export const digits = (rng: T.RNG) => (n: number) =>
  Math.round(rng() * Math.pow(10, n));

/**
 * Returns a number between `min` and `max`.
 */
export const between = (rng: T.RNG) => (min: number, max: number) =>
  Math.floor(rng() * (max - min + 1) + min);
