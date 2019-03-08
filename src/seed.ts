import {between} from './number';
import * as T from './types';

/**
 * Generates fixed size, alphabetic seed value.
 */
export const generateAlphabeticSeed = (rng: T.RNG) => (length: number) => {
  let result = [];
  for (let n = 0; n < length; n++) {
    result.push(String.fromCharCode(between(rng)(65, 90)));
  }
  return result.join('');
};
