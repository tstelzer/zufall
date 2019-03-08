import * as T from './types';

type NonZeroNumber = number;

/**
 * Returns an `n`-digit number.
 */
export const digits = (rng: T.RNG) => (length: NonZeroNumber) => {
  if (length < 1) {
    throw new TypeError(
      `digits: argument "length" must be a number greater than 0, but was ${length}.`,
    );
  }

  const n = Math.pow(10, length - 1);
  const result = Math.ceil(rng() * 9 * n) + n;

  return result;
};

/**
 * Returns a number between `min` and `max`.
 */
export const between = (rng: T.RNG) => (min: number, max: number) =>
  Math.floor(rng() * (max - min + 1) + min);
