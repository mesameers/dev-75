/**
 * Deterministic pseudo-random number generator (Mulberry32)
 * Ensures every render on any machine/commit produces identical frames.
 */
export function createRNG(seed: number = 1337) {
  let s = seed >>> 0;
  return function next(): number {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Hash a string to a 32-bit unsigned integer seed
 */
export function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash >>> 0;
  }
  return hash;
}

/**
 * Returns a deterministic float [min, max) given a seed key and index
 */
export function seededFloat(key: string, index: number, min: number = 0, max: number = 1): number {
  const rng = createRNG(hashString(`${key}_${index}`));
  return min + rng() * (max - min);
}
