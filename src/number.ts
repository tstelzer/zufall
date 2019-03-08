import * as T from './zufall';

/**
 * Returns an `n`-digit number.
 */
export const digits = (rng: T.prng) => (length: T.NonZeroNumber) => {
  if (length < 1) {
    throw new TypeError(
      `argument "length" must be a number greater than 0, but was ${length}.`,
    );
  }

  const n = Math.pow(10, length - 1);
  const result = Math.ceil(rng() * 9 * n) + n;

  return result;
};

/**
 * Returns a number between `min` and `max`.
 * FIXME: What if max < min?
 */
export const between = (rng: T.prng) => (min: number, max: number) =>
  Math.floor(rng() * (max - min + 1) + min);
