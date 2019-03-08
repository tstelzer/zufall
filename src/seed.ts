import {between} from './number';
import * as T from './zufall';

/**
 * Generates fixed size, alphabetic seed value.
 */
export const alphabetic = (rng: T.prng) => (length: T.NonZeroNumber) => {
  if (length < 1) {
    throw new TypeError(
      `argument "length" must be a number greater than 0, but was ${length}.`,
    );
  }
  let result = [];
  for (let n = 0; n < length; n++) {
    result.push(String.fromCharCode(between(rng)(65, 90)));
  }
  return result.join('');
};
