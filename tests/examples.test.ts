import { describe, it, expect } from 'vitest';
import { EXAMPLES } from '../src/lib/examples';

describe('EXAMPLES config', () => {
  it('has six layout examples', () => {
    expect(EXAMPLES).toHaveLength(6);
  });

  it('has unique ids', () => {
    const ids = EXAMPLES.map((ex) => ex.id);
    expect(new Set(ids).size).toBe(EXAMPLES.length);
  });

  it('gives every example a label, title, description and code snippet', () => {
    for (const ex of EXAMPLES) {
      expect(ex.label.trim()).not.toBe('');
      expect(ex.title.trim()).not.toBe('');
      expect(ex.description.trim()).not.toBe('');
      expect(ex.code.trim()).not.toBe('');
    }
  });

  it('uses the expected example ids the picker css relies on', () => {
    expect(EXAMPLES.map((ex) => ex.id)).toEqual([
      'waterfall',
      'varied',
      'spanning',
      'placement',
      'brick',
      'tolerance',
    ]);
  });

  it('uses grid-lanes in every code snippet', () => {
    for (const ex of EXAMPLES) {
      expect(ex.code).toContain('grid-lanes');
    }
  });
});
