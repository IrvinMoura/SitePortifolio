# 003 — CSS moderno com tokens, sem Tailwind
**Status:** Aceito · 18/10/2026

**Contexto:** a direção editorial exige controle tipográfico fino e um sistema de tokens que também alimente as figuras (SVG/React).

**Decisão:** CSS nativo com custom properties como tokens (`src/styles/tokens.css`), `@layer`, container queries, `oklch`. Estilos de componente com escopo do Astro.

**Alternativas:** Tailwind 4 (mais rápido de escrever, mas o design system passa a morar em classes; menos expressivo para um layout editorial).

**Consequências:** os tokens são a fonte da verdade visual; `DESIGN.md` documenta apenas o racional.
