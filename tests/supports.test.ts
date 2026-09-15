import { describe, it, expect } from 'vitest';
import { shouldShowUnsupportedNotice } from '../src/lib/supports';

describe('shouldShowUnsupportedNotice', () => {
  it('returns false in browsers that support grid lanes', () => {
    expect(shouldShowUnsupportedNotice(() => true)).toBe(false);
  });

  it('returns true in browsers that do not support grid lanes', () => {
    expect(shouldShowUnsupportedNotice(() => false)).toBe(true);
  });

  it('returns true when CSS.supports is unavailable', () => {
    expect(
      shouldShowUnsupportedNotice(() => {
        throw new TypeError('CSS.supports is not a function');
      }),
    ).toBe(true);
  });
});
