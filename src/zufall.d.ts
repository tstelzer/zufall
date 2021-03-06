export type NonZeroNumber = number;

export type seedrandomStateType = boolean | (() => prng);

export interface prng {
  new (seed?: string, options?: seedRandomOptions, callback?: any): prng;
  (): number;
  quick(): number;
  int32(): number;
  double(): number;
  state(): () => prng;
}

export interface seedrandom_prng {
  (seed?: string, options?: seedRandomOptions, callback?: any): prng;
  alea: (seed?: string, options?: seedRandomOptions, callback?: seedrandomCallback) => prng;
  xor128: (seed?: string, options?: seedRandomOptions, callback?: seedrandomCallback) => prng;
  tychei: (seed?: string, options?: seedRandomOptions, callback?: seedrandomCallback) => prng;
  xorwow: (seed?: string, options?: seedRandomOptions, callback?: seedrandomCallback) => prng;
  xor4096: (seed?: string, options?: seedRandomOptions, callback?: seedrandomCallback) => prng;
  xorshift7: (seed?: string, options?: seedRandomOptions, callback?: seedrandomCallback) => prng;
  quick: (seed?: string, options?: seedRandomOptions, callback?: seedrandomCallback) => prng;
}

interface seedrandomCallback {
  (prng?: prng, shortseed?: string, global?: boolean, state?: seedrandomStateType): prng;
}

interface seedRandomOptions {
  entropy?: boolean;
  'global'?: boolean;
  state?: seedrandomStateType;
  pass?: seedrandomCallback;
}
