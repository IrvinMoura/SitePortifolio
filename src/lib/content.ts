import type { MemorialData } from '../content/schemas';

/** A página /memoriais só existe a partir deste número de memoriais publicados (ADR 006). */
export const MIN_MEMORIAIS_FOR_INDEX = 3;

export const NATURE_LABELS: Record<MemorialData['nature'], string> = {
  cliente: 'Cliente',
  academico: 'Acadêmico',
  demonstrativo: 'Demonstrativo',
  proprio: 'Projeto próprio',
  'open-source': 'Open source',
};

export const STATUS_LABELS: Record<MemorialData['status'], string> = {
  'em-producao': 'Em produção',
  'em-andamento': 'Em andamento',
  prototipo: 'Protótipo',
  arquivado: 'Arquivado',
};

/** Rascunhos aparecem só em desenvolvimento; ordena do mais recente para o mais antigo. */
export function publishedFirst<T extends { data: Pick<MemorialData, 'draft' | 'number'> }>(
  entries: T[],
  { includeDrafts = false } = {},
): T[] {
  return entries
    .filter((entry) => includeDrafts || !entry.data.draft)
    .sort((a, b) => b.data.number - a.data.number);
}

export function shouldBuildIndex(publishedCount: number): boolean {
  return publishedCount >= MIN_MEMORIAIS_FOR_INDEX;
}

/** "001" a partir de 1. */
export function memorialNumber(n: number): string {
  return String(n).padStart(3, '0');
}
