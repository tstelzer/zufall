# Zufall

Generate random values and noise.

## Installation

```sh
yarn add @tstelzer/zufall
# or
npm install @tstelzer/zufall
```

## Usage

```typescript
import makeRandom from 'zufall';

// Building with a static seed will
// always return predictable results ...
const random = makeRandom('SEED');

// Static seed value for reference.
random.seed; // 'SEED'

// Pseudo-random number (generic).
random.number(); // Always 0.8566100631751684
random.number(); // Always 0.09421503014329177

// Also exposes different implementations from the underlying RNG
// see https://github.com/davidbau/seedrandom for
// functionality beyond whats documented here.
random.number.alea();
random.number.xor128();
random.number.tychei();
random.number.xorwow();
random.number.xor4096();
random.number.xorshift7();
random.number.quick();

// Pseudo-random number with `n` digits.
random.digits(10) // Always 8709490569
random.digits(10) // Always 1847935272

// Pseudo-random number between min and max (both inclusive).
random.between(0, 100) // Always 86
random.between(0, 100) // Always 9
random.between(0, 100) // Always 99

// Open Simplex Noise.
// Note: Implementation is essentially copied from
// https://github.com/joshforisha/open-simplex-noise-js
// with two additions:
// 1. The internal RNG was replaced.
// 2. The public interface is functional instead of OO.
// 3. The `arrayND` methods have been omitted.
random.noise2D(0, 1) // Always -0.27409970004637957
random.noise3D(0, 1, 2) // Always -0.08090614886731362
random.noise4D(0, 1, 2, 4) // Always -0.3194015527038483

// Omitting a seed will generate practically
// unpredictable results every time.
const random = makeRandom();
```

## Build locally

Clone repository.

```sh
git clone github.com/tstelzer/zufall
```

Install dependencies.

```sh
cd zufall
yarn
# or
npm install
```

## Run test suite

Assuming you have cloned the repository and installed dependencies.

```sh
yarn test
# or
npm test
```
