# 004 — Conteúdo em MDX no repositório, sem CMS
**Status:** Aceito · 18/10/2026

**Contexto:** um único autor; conteúdo inclui componentes interativos dentro do texto.

**Decisão:** content collections do Astro com MDX e schemas Zod que impõem as regras de honestidade (natureza obrigatória, métrica com `source`).

**Alternativas:** CMS headless (Sanity, Decap). Útil só se outra pessoa for editar; adiciona custo e complexidade.

**Consequências:** conteúdo versionado e revisável; publicar = commit + deploy. Reavaliar se houver outro editor.
