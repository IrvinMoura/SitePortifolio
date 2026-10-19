import { describe, expect, it } from 'vitest';
import { canonicalPath } from './url';

describe('canonicalPath', () => {
  it.each([
    ['/', '/'],
    ['/index.html', '/'],
    ['/registro', '/registro'],
    ['/registro.html', '/registro'],
    ['/registro/', '/registro'],
    ['/memoriais/este-site.html', '/memoriais/este-site'],
    ['/memoriais/index.html', '/memoriais'],
  ])('%s → %s', (input, expected) => {
    expect(canonicalPath(input)).toBe(expected);
  });
});
