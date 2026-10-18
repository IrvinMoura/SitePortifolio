# 005 — Motion: CSS nativo primeiro, Motion nas ilhas
**Status:** Aceito · 18/10/2026

**Contexto:** a interação deve explicar, sem pesar. Suporte (MDN BCD 8.1.6): View Transitions cross-document em Chrome 126+ e Safari 18.2+, sem suporte no Firefox; `animation-timeline` sem suporte estável no Firefox.

**Decisão:** (1) CSS nativo (View Transitions, `@starting-style`, transições) como aprimoramento progressivo; (2) biblioteca `motion` dentro das ilhas React; (3) GSAP apenas por novo ADR, se a figura-assinatura comprovadamente exigir.

**Alternativas rejeitadas no MVP:** Lenis (scroll nativo é melhor para leitura e acessibilidade), Three.js/R3F (nada na direção pede 3D), GSAP por padrão (licença própria não-MIT e mais peso).

**Consequências:** toda interação tem fallback definido em `INTERACTIONS.md`; usuários de Firefox recebem navegação sem transição.
