import { describe, expect, it, vi } from 'vitest';
import { memoize } from './memoize.js';

describe('memoize', () => {
  it('returns the same result as the original function', () => {
    const add = memoize((a: number, b: number) => a + b);
    expect(add(2, 3)).toBe(5);
  });

  it('calls the original function only once for the same arguments', () => {
    const fn = vi.fn((a: number, b: number) => a * b);
    const memoized = memoize(fn);

    memoized(4, 5);
    memoized(4, 5);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls the original function again for different arguments', () => {
    const fn = vi.fn((a: number, b: number) => a * b);
    const memoized = memoize(fn);

    memoized(4, 5);
    memoized(5, 4);

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
