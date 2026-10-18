const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

/** "18 out 2026". Usa UTC porque as datas do conteúdo são dias, sem horário. */
export function formatDate(date: Date): string {
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** "out. 2026 – atual" ou "out. 2026 – dez. 2026". */
export function formatPeriod(start: Date, end?: Date): string {
  const month = (d: Date) => `${MONTHS[d.getUTCMonth()]}. ${d.getUTCFullYear()}`;
  return `${month(start)} – ${end ? month(end) : 'atual'}`;
}

/** Valor para o atributo datetime de <time>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
