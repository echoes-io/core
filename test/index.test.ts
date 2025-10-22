import { describe, expect, test } from 'vitest';

import { getTextStats, parseMarkdown } from '../lib/index.js';

describe('index', () => {
  test('exports parseMarkdown function', () => {
    expect(typeof parseMarkdown).toBe('function');
  });

  test('exports getTextStats function', () => {
    expect(typeof getTextStats).toBe('function');
  });
});
