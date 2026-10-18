# Quality gates

> Condições objetivas para considerar uma mudança ou o site "pronto". Itens automatizáveis rodam no CI a partir da fase 3.

## Orçamentos (CI falha se exceder)
| Métrica | Limite | Meta | Onde medir |
|---|---|---|---|
| JS na home (gzip) | ≤ 150 KB | < 50 KB | Lighthouse CI / relatório de build |
| JS em página sem ilha | 0 KB próprios (exceto tema e copiar) | — | Build |
| LCP (mobile, 4G simulado) | < 2,5 s | < 2,0 s | Lighthouse CI |
| CLS | < 0,1 | < 0,05 | Lighthouse CI |
| INP / TBT | TBT < 200 ms | < 100 ms | Lighthouse CI |
| Lighthouse (Perf, A11y, Best Practices, SEO) | ≥ 95 cada | 100 | Lighthouse CI |
| Fontes | ≤ 5 arquivos, ≤ 150 KB total | — | Build |
| Peso total da home | ≤ 500 KB | < 300 KB | Lighthouse CI |

## Definition of Done (toda mudança)
- [ ] `astro check`, lint e testes passam.
- [ ] Zero violação axe (WCAG 2.2 A/AA) nas rotas afetadas.
- [ ] Navegável por teclado, com foco visível e ordem lógica.
- [ ] Funciona com `prefers-reduced-motion: reduce` e sem JS (conteúdo visível).
- [ ] Testado em 360 px, 768 px e 1440 px; sem scroll horizontal.
- [ ] Temas claro e escuro conferidos.
- [ ] Interações novas registradas em [INTERACTIONS.md](INTERACTIONS.md).
- [ ] Dependência nova → ADR em `docs/decisions/`.
- [ ] Screenshots visuais atualizados intencionalmente (não aceitar diffs sem revisar).

## Checklist de memorial (estudo de caso)
- [ ] Ficha técnica completa: natureza, status, papel, período, stack.
- [ ] Natureza correta e visível. Fictício declarado como fictício.
- [ ] Toda métrica tem `source` verificável (o schema exige).
- [ ] Nenhum depoimento, logo ou nome de cliente sem autorização.
- [ ] Abertura em linguagem de negócio (um leigo entende o problema).
- [ ] Seções do template: contexto e problema · público · solução · fluxos · arquitetura e stack · decisões (ADR curto) · interface · qualidade (só o que existe) · resultados/aprendizados · links.
- [ ] Figuras com legenda, texto alternativo e fallback estático.
- [ ] Links de demo e repositório funcionando (verificados no CI).
- [ ] Revisão ortográfica.

## Lançamento (fase 10)
- [ ] Todos os orçamentos e o DoD cumpridos em todas as rotas.
- [ ] Teste manual: NVDA + Firefox (Windows) e VoiceOver + Safari (iOS), se possível.
- [ ] Navegadores: Chrome, Firefox e Safari (desktop); Chrome Android e Safari iOS.
- [ ] Teste de 30 s com 3 pessoas (1 não técnica): sabem o que você faz, para quem e como contatar.
- [ ] OG image confere em LinkedIn, WhatsApp e X (ferramentas de preview).
- [ ] Cabeçalhos de segurança: nota A em securityheaders.com.
- [ ] 404 funciona; sitemap e robots corretos; `noindex` ausente em produção.
- [ ] Analytics sem cookies ativo; nenhum banner necessário.
- [ ] Currículo PDF atualizado e acessível (com tags).
