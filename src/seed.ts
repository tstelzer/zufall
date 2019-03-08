import * as seedrandom from 'seedrandom';

import {between} from './number';

/**
 * Generates human readable, fixed size seed value.
 */
export const alphanumeric = (length: number) => {
  let result = [];
  for (let n = 0; n < length; n++) {
    result.push(String.fromCharCode(between(seedrandom())(65, 90)));
  }
  return result.join('');
};
