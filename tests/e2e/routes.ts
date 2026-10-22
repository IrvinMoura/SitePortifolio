/** Rotas públicas verificadas pelos testes de fumaça. */
export const ROUTES = ['/', '/sobre', '/registro'] as const;

/** Rotas verificadas pelo axe: as públicas mais a página interna com todos os componentes. */
export const A11Y_ROUTES = [...ROUTES, '/interno/componentes', '/404'] as const;
