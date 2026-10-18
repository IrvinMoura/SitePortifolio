import { describe, expect, it } from 'vitest';
import { memorialSchema } from './schemas';

const valid = {
  number: 1,
  title: 'Este site',
  summary: 'Resumo.',
  nature: 'proprio',
  status: 'em-andamento',
  role: 'Solo',
  period: { start: '2026-10-18' },
  areas: ['site'],
  stack: ['Astro'],
  updated: '2026-10-18',
};

describe('memorialSchema — regras de honestidade', () => {
  it('aceita um memorial completo', () => {
    expect(memorialSchema.safeParse(valid).success).toBe(true);
  });

  it('exige natureza declarada', () => {
    const withoutNature: Partial<typeof valid> = { ...valid };
    delete withoutNature.nature;
    expect(memorialSchema.safeParse(withoutNature).success).toBe(false);
  });

  it('rejeita natureza desconhecida', () => {
    expect(memorialSchema.safeParse({ ...valid, nature: 'case-de-sucesso' }).success).toBe(false);
  });

  it('rejeita métrica sem fonte', () => {
    const result = memorialSchema.safeParse({
      ...valid,
      metrics: [{ label: 'Tempo economizado', value: '10 h/semana' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejeita métrica com fonte que não é URL', () => {
    const result = memorialSchema.safeParse({
      ...valid,
      metrics: [{ label: 'Lighthouse', value: '100', source: 'confia' }],
    });
    expect(result.success).toBe(false);
  });

  it('aceita métrica com fonte verificável', () => {
    const result = memorialSchema.safeParse({
      ...valid,
      metrics: [{ label: 'Lighthouse', value: '100', source: 'https://example.com/relatorio' }],
    });
    expect(result.success).toBe(true);
  });
});
