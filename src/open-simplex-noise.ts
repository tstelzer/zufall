/**
 * Original source: https://github.com/joshforisha/open-simplex-noise-js
 */
import {
  base2D,
  base3D,
  base4D,
  gradients2D,
  gradients3D,
  gradients4D,
  lookupPairs2D,
  lookupPairs3D,
  lookupPairs4D,
  NORM_2D,
  NORM_3D,
  NORM_4D,
  p2D,
  p3D,
  p4D,
  SQUISH_2D,
  SQUISH_3D,
  SQUISH_4D,
  STRETCH_2D,
  STRETCH_3D,
  STRETCH_4D,
} from './constants';

import {digits} from './number';
import * as T from './zufall';

class Contribution2 {
  public dx: number;
  public dy: number;
  public next: Contribution2;
  public xsb: number;
  public ysb: number;

  constructor(multiplier: number, xsb: number, ysb: number) {
    this.dx = -xsb - multiplier * SQUISH_2D;
    this.dy = -ysb - multiplier * SQUISH_2D;
    this.xsb = xsb;
    this.ysb = ysb;
  }
}

class Contribution3 {
  public dx: number;
  public dy: number;
  public dz: number;
  public next: Contribution3;
  public xsb: number;
  public ysb: number;
  public zsb: number;

  constructor(multiplier: number, xsb: number, ysb: number, zsb: number) {
    this.dx = -xsb - multiplier * SQUISH_3D;
    this.dy = -ysb - multiplier * SQUISH_3D;
    this.dz = -zsb - multiplier * SQUISH_3D;
    this.xsb = xsb;
    this.ysb = ysb;
    this.zsb = zsb;
  }
}

class Contribution4 {
  public dw: number;
  public dx: number;
  public dy: number;
  public dz: number;
  public next: Contribution4;
  public wsb: number;
  public xsb: number;
  public ysb: number;
  public zsb: number;

  constructor(
    multiplier: number,
    xsb: number,
    ysb: number,
    zsb: number,
    wsb: number,
  ) {
    this.dx = -xsb - multiplier * SQUISH_4D;
    this.dy = -ysb - multiplier * SQUISH_4D;
    this.dz = -zsb - multiplier * SQUISH_4D;
    this.dw = -wsb - multiplier * SQUISH_4D;
    this.xsb = xsb;
    this.ysb = ysb;
    this.zsb = zsb;
    this.wsb = wsb;
  }
}

function setup(rng: T.prng) {
  let lookup2D: Contribution2[];
  let lookup3D: Contribution3[];
  let lookup4D: Contribution4[];
  let perm: Uint8Array;
  let perm2D: Uint8Array;
  let perm3D: Uint8Array;
  let perm4D: Uint8Array;

  let contributions2D: Contribution2[] = [];
  for (let i = 0; i < p2D.length; i += 4) {
    let baseSet = base2D[p2D[i]];
    let previous: Contribution2 = null;
    let current: Contribution2 = null;
    for (let k = 0; k < baseSet.length; k += 3) {
      current = new Contribution2(baseSet[k], baseSet[k + 1], baseSet[k + 2]);
      if (previous === null) {
        contributions2D[i / 4] = current;
      } else {
        previous.next = current;
      }
      previous = current;
    }
    current.next = new Contribution2(p2D[i + 1], p2D[i + 2], p2D[i + 3]);
  }
  lookup2D = [];
  for (let i = 0; i < lookupPairs2D.length; i += 2) {
    lookup2D[lookupPairs2D[i]] = contributions2D[lookupPairs2D[i + 1]];
  }

  let contributions3D: Contribution3[] = [];
  for (let i = 0; i < p3D.length; i += 9) {
    let baseSet = base3D[p3D[i]];
    let previous: Contribution3 = null;
    let current: Contribution3 = null;
    for (let k = 0; k < baseSet.length; k += 4) {
      current = new Contribution3(
        baseSet[k],
        baseSet[k + 1],
        baseSet[k + 2],
        baseSet[k + 3],
      );
      if (previous === null) {
        contributions3D[i / 9] = current;
      } else {
        previous.next = current;
      }
      previous = current;
    }
    current.next = new Contribution3(
      p3D[i + 1],
      p3D[i + 2],
      p3D[i + 3],
      p3D[i + 4],
    );
    current.next.next = new Contribution3(
      p3D[i + 5],
      p3D[i + 6],
      p3D[i + 7],
      p3D[i + 8],
    );
  }
  lookup3D = [];
  for (let i = 0; i < lookupPairs3D.length; i += 2) {
    lookup3D[lookupPairs3D[i]] = contributions3D[lookupPairs3D[i + 1]];
  }

  let contributions4D: Contribution4[] = [];
  for (let i = 0; i < p4D.length; i += 16) {
    let baseSet = base4D[p4D[i]];
    let previous: Contribution4 = null;
    let current: Contribution4 = null;
    for (let k = 0; k < baseSet.length; k += 5) {
      current = new Contribution4(
        baseSet[k],
        baseSet[k + 1],
        baseSet[k + 2],
        baseSet[k + 3],
        baseSet[k + 4],
      );
      if (previous === null) {
        contributions4D[i / 16] = current;
      } else {
        previous.next = current;
      }
      previous = current;
    }
    current.next = new Contribution4(
      p4D[i + 1],
      p4D[i + 2],
      p4D[i + 3],
      p4D[i + 4],
      p4D[i + 5],
    );
    current.next.next = new Contribution4(
      p4D[i + 6],
      p4D[i + 7],
      p4D[i + 8],
      p4D[i + 9],
      p4D[i + 10],
    );
    current.next.next.next = new Contribution4(
      p4D[i + 11],
      p4D[i + 12],
      p4D[i + 13],
      p4D[i + 14],
      p4D[i + 15],
    );
  }
  lookup4D = [];
  for (let i = 0; i < lookupPairs4D.length; i += 2) {
    lookup4D[lookupPairs4D[i]] = contributions4D[lookupPairs4D[i + 1]];
  }
  perm = new Uint8Array(256);
  perm2D = new Uint8Array(256);
  perm3D = new Uint8Array(256);
  perm4D = new Uint8Array(256);
  let source = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    source[i] = i;
  }
  let seed = digits(rng)(13);
  for (let i = 255; i >= 0; i--) {
    let r = new Uint32Array(1);
    r[0] = (seed + 31) % (i + 1);
    if (r[0] < 0) {
      r[0] += i + 1;
    }
    perm[i] = source[r[0]];
    perm2D[i] = perm[i] & 0x0e;
    perm3D[i] = (perm[i] % 24) * 3;
    perm4D[i] = perm[i] & 0xfc;
    source[r[0]] = source[i];
    seed = digits(rng)(13);
  }

  return {
    lookup2D,
    lookup3D,
    lookup4D,
    perm,
    perm2D,
    perm3D,
    perm4D,
  };
}

export const openSimplexNoise = (rng: T.prng) => {
  let {lookup2D, lookup3D, lookup4D, perm, perm2D, perm3D, perm4D} = setup(rng);

  const noise2D = (x: number, y: number): number => {
    let stretchOffset = (x + y) * STRETCH_2D;

    let xs = x + stretchOffset;
    let ys = y + stretchOffset;

    let xsb = Math.floor(xs);
    let ysb = Math.floor(ys);

    let squishOffset = (xsb + ysb) * SQUISH_2D;

    let dx0 = x - (xsb + squishOffset);
    let dy0 = y - (ysb + squishOffset);

    let xins = xs - xsb;
    let yins = ys - ysb;

    let inSum = xins + yins;
    let hash =
      (xins - yins + 1) |
      (inSum << 1) |
      ((inSum + yins) << 2) |
      ((inSum + xins) << 4);

    let value = 0;

    for (let c = lookup2D[hash]; c !== undefined; c = c.next) {
      let dx = dx0 + c.dx;
      let dy = dy0 + c.dy;

      let attn = 2 - dx * dx - dy * dy;
      if (attn > 0) {
        let px = xsb + c.xsb;
        let py = ysb + c.ysb;

        let indexPartA = perm[px & 0xff];
        let index = perm2D[(indexPartA + py) & 0xff];

        let valuePart = gradients2D[index] * dx + gradients2D[index + 1] * dy;

        value += attn * attn * attn * attn * valuePart;
      }
    }

    return value * NORM_2D;
  };

  const noise3D = (x: number, y: number, z: number): number => {
    let stretchOffset = (x + y + z) * STRETCH_3D;

    let xs = x + stretchOffset;
    let ys = y + stretchOffset;
    let zs = z + stretchOffset;

    let xsb = Math.floor(xs);
    let ysb = Math.floor(ys);
    let zsb = Math.floor(zs);

    let squishOffset = (xsb + ysb + zsb) * SQUISH_3D;

    let dx0 = x - (xsb + squishOffset);
    let dy0 = y - (ysb + squishOffset);
    let dz0 = z - (zsb + squishOffset);

    let xins = xs - xsb;
    let yins = ys - ysb;
    let zins = zs - zsb;

    let inSum = xins + yins + zins;
    let hash =
      (yins - zins + 1) |
      ((xins - yins + 1) << 1) |
      ((xins - zins + 1) << 2) |
      (inSum << 3) |
      ((inSum + zins) << 5) |
      ((inSum + yins) << 7) |
      ((inSum + xins) << 9);

    let value = 0;

    for (let c = lookup3D[hash]; c !== undefined; c = c.next) {
      let dx = dx0 + c.dx;
      let dy = dy0 + c.dy;
      let dz = dz0 + c.dz;

      let attn = 2 - dx * dx - dy * dy - dz * dz;
      if (attn > 0) {
        let px = xsb + c.xsb;
        let py = ysb + c.ysb;
        let pz = zsb + c.zsb;

        let indexPartA = perm[px & 0xff];
        let indexPartB = perm[(indexPartA + py) & 0xff];
        let index = perm3D[(indexPartB + pz) & 0xff];

        let valuePart =
          gradients3D[index] * dx +
          gradients3D[index + 1] * dy +
          gradients3D[index + 2] * dz;

        value += attn * attn * attn * attn * valuePart;
      }
    }
    return value * NORM_3D;
  };

  const noise4D = (x: number, y: number, z: number, w: number): number => {
    let stretchOffset = (x + y + z + w) * STRETCH_4D;

    let xs = x + stretchOffset;
    let ys = y + stretchOffset;
    let zs = z + stretchOffset;
    let ws = w + stretchOffset;

    let xsb = Math.floor(xs);
    let ysb = Math.floor(ys);
    let zsb = Math.floor(zs);
    let wsb = Math.floor(ws);

    let squishOffset = (xsb + ysb + zsb + wsb) * SQUISH_4D;
    let dx0 = x - (xsb + squishOffset);
    let dy0 = y - (ysb + squishOffset);
    let dz0 = z - (zsb + squishOffset);
    let dw0 = w - (wsb + squishOffset);

    let xins = xs - xsb;
    let yins = ys - ysb;
    let zins = zs - zsb;
    let wins = ws - wsb;

    let inSum = xins + yins + zins + wins;
    let hash =
      (zins - wins + 1) |
      ((yins - zins + 1) << 1) |
      ((yins - wins + 1) << 2) |
      ((xins - yins + 1) << 3) |
      ((xins - zins + 1) << 4) |
      ((xins - wins + 1) << 5) |
      (inSum << 6) |
      ((inSum + wins) << 8) |
      ((inSum + zins) << 11) |
      ((inSum + yins) << 14) |
      ((inSum + xins) << 17);

    let value = 0;

    for (let c = lookup4D[hash]; c !== undefined; c = c.next) {
      let dx = dx0 + c.dx;
      let dy = dy0 + c.dy;
      let dz = dz0 + c.dz;
      let dw = dw0 + c.dw;

      let attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
      if (attn > 0) {
        let px = xsb + c.xsb;
        let py = ysb + c.ysb;
        let pz = zsb + c.zsb;
        let pw = wsb + c.wsb;

        let indexPartA = perm[px & 0xff];
        let indexPartB = perm[(indexPartA + py) & 0xff];
        let indexPartC = perm[(indexPartB + pz) & 0xff];
        let index = perm4D[(indexPartC + pw) & 0xff];

        let valuePart =
          gradients4D[index] * dx +
          gradients4D[index + 1] * dy +
          gradients4D[index + 2] * dz +
          gradients4D[index + 3] * dw;

        value += attn * attn * attn * attn * valuePart;
      }
    }
    return value * NORM_4D;
  };

  return {noise2D, noise3D, noise4D};
};

export default openSimplexNoise;
