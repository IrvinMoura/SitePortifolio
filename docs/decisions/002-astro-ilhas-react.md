# 002 — Astro estático com ilhas React
**Status:** Aceito · 18/10/2026

**Contexto:** site de conteúdo, com interatividade localizada (figuras). Performance e SEO são requisitos. React tem valor de vitrine para vagas.

**Decisão:** Astro (7.x) com saída estática, TypeScript strict e `@astrojs/react` apenas para ilhas em `src/components/islands/`.

**Alternativas:** Next.js 16 (todo o site em React; mais JS e complexidade sem ganho para o visitante); Astro com Preact/Svelte (mais leve, menos valor de vitrine).

**Consequências:** zero JS por padrão; content collections tipadas; i18n nativo. Componentes de layout são `.astro`, não React.
