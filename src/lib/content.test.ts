import { describe, expect, it } from 'vitest';
import { memorialNumber, publishedFirst, shouldBuildIndex } from './content';

const entry = (number: number, draft = false) => ({ id: `m${number}`, data: { number, draft } });

describe('publishedFirst', () => {
  it('remove rascunhos e ordena do mais recente para o mais antigo', () => {
    const result = publishedFirst([entry(1), entry(3, true), entry(2)]);
    expect(result.map((e) => e.data.number)).toEqual([2, 1]);
  });

  it('inclui rascunhos quando pedido', () => {
    expect(publishedFirst([entry(1), entry(2, true)], { includeDrafts: true })).toHaveLength(2);
  });
});

describe('shouldBuildIndex', () => {
  it('só gera o índice com 3 ou mais memoriais', () => {
    expect(shouldBuildIndex(0)).toBe(false);
    expect(shouldBuildIndex(2)).toBe(false);
    expect(shouldBuildIndex(3)).toBe(true);
  });
});

describe('memorialNumber', () => {
  it('completa com zeros à esquerda', () => {
    expect(memorialNumber(1)).toBe('001');
    expect(memorialNumber(42)).toBe('042');
  });
});
