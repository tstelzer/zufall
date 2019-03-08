import * as T from './types';

/**
 * Returns an `n`-digit number.
 */
export const digits = (rand: T.RNG) => (n: number) =>
  Math.round(rand() * Math.pow(10, n));

/**
 * Returns a number between `min` and `max`.
 */
export const between = (rand: T.RNG) => (min: number, max: number) =>
  Math.floor(rand() * (max - min + 1) + min);
