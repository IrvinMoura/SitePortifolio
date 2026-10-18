import { describe, expect, it } from 'vitest';
import { formatDate, formatPeriod, isoDate } from './format';

describe('formatDate', () => {
  it('formata dia, mês abreviado e ano em português', () => {
    expect(formatDate(new Date('2026-10-18'))).toBe('18 out 2026');
  });

  it('não muda de dia por causa do fuso horário', () => {
    expect(formatDate(new Date('2026-01-01'))).toBe('1 jan 2026');
  });
});

describe('formatPeriod', () => {
  it('mostra "atual" quando não há fim', () => {
    expect(formatPeriod(new Date('2026-10-18'))).toBe('out. 2026 – atual');
  });

  it('mostra início e fim', () => {
    expect(formatPeriod(new Date('2026-10-01'), new Date('2026-12-15'))).toBe(
      'out. 2026 – dez. 2026',
    );
  });
});

describe('isoDate', () => {
  it('gera AAAA-MM-DD', () => {
    expect(isoDate(new Date('2026-10-18'))).toBe('2026-10-18');
  });
});
