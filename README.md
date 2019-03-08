# Zufall

Generate random values and noise.

## Usage

```typescript
import makeRandom from 'zufall';

// Building with a static seed will always return predictable results ...
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

// Pseudo-random number between `min` (exclusive) and `max` (inclusive).
random.between(0, 100) // Always 86
random.between(0, 100) // Always 9
random.between(0, 100) // Always 99

// ... omitting a seed will generate pseudo-random results every time.
const random = makeRandom();
```
