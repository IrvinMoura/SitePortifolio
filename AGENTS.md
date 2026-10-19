# AGENTS.md

Orientações para agentes de IA (e pessoas) que trabalham neste repositório.

## O projeto
Portfólio profissional de Irvin Marques, desenvolvedor independente. Conceito **Memorial**: caderno técnico autoral com seções numeradas, notas de margem e figuras interativas. Site estático em **Astro + TypeScript**, com **ilhas React** só onde há interação.

## Leia antes de mudar algo
| Se a tarefa envolve… | Leia |
|---|---|
| Escopo, público, regras de conteúdo | [docs/PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md) |
| Visual, componentes, tipografia, cor | [docs/DESIGN.md](docs/DESIGN.md) |
| Animação ou qualquer interação | [docs/INTERACTIONS.md](docs/INTERACTIONS.md) |
| Stack, pastas, rotas, schemas | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| O que fazer agora | [docs/ROADMAP.md](docs/ROADMAP.md) |
| Quando está pronto | [docs/QUALITY_GATES.md](docs/QUALITY_GATES.md) |
| Por que algo foi decidido | [docs/decisions/](docs/decisions/) |

## Regras inegociáveis
1. **Nunca invente conteúdo:** projetos, clientes, métricas, depoimentos, logos, experiências ou resultados. Na falta de conteúdo real, deixe a seção sem renderizar e avise. Não use placeholders nem lorem ipsum em produção.
2. Todo memorial declara sua **natureza** (`cliente`, `academico`, `demonstrativo`, `proprio`, `open-source`), e métricas exigem `source`.
3. **Conteúdo nunca depende de JS ou de animação.** Respeite `prefers-reduced-motion`.
4. Toda interação nova entra primeiro em `docs/INTERACTIONS.md`, com fallback.
5. **Dependência nova exige ADR** em `docs/decisions/`. Não adicionar sem ADR: Lenis, Three.js, GSAP, Tailwind, bibliotecas de UI, CMS, backend.
6. Respeite os orçamentos de `docs/QUALITY_GATES.md`; o CI falha se forem excedidos.
7. Não faça commit, push ou deploy sem pedido explícito.

## Convenções
- **Idiomas:** conteúdo e documentação em PT-BR; código, identificadores, nomes de arquivo de código e mensagens de commit em inglês. Slugs de rota em PT-BR (`/memoriais`, `/sobre`, `/registro`).
- **CSS:** valores visuais só via tokens de `src/styles/tokens.css`; `@layer` (reset, tokens, base, components, utilities); container queries para variação de componente.
- **Componentes:** `.astro` por padrão; React só em `src/components/islands/`, hidratado com `client:visible`.
- **Acessibilidade:** HTML semântico primeiro; ARIA só quando não houver elemento nativo.
- **Sem abstração antecipada:** crie um componente ou utilitário quando houver um uso real.
- **Texto com link ou destaque no meio:** o Prettier quebra linhas em volta de `<a>`/`<strong>`, e o build do Astro transforma isso em espaço sobrando ("link ,") ou faltando ("a<strong>"). Use `{' '}` antes do elemento, ou `<!-- prettier-ignore -->` com a frase em uma linha quando houver pontuação logo depois. O teste `home.spec.ts` detecta os dois casos.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`…), pequenos e focados.

## Comandos
Requer **Node ≥ 22.22** (recomendado: 24, ver `.node-version`).

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em http://localhost:4321 |
| `npm run build` / `npm run preview` | Build estático em `dist/` e servidor para conferir |
| `npm run check` | Tipos e diagnósticos do Astro |
| `npm run lint` / `npm run format` | ESLint (inclui jsx-a11y) / Prettier |
| `npm test` | Vitest (utilitários e schemas) |
| `npm run test:e2e` | Playwright + axe sobre o build (rode `npm run build` antes) |
| `npm run lhci` | Lighthouse CI com os orçamentos de `docs/QUALITY_GATES.md` |
| `npm run build:test` | Build com a página interna `/interno/componentes` (usado pelos testes) |
| `npm run test:visual` | Comparação visual (só local, referências por sistema operacional). `test:visual:update` regrava todas; revise as imagens antes de commitar |
| `npm run verify` | Tudo acima menos Lighthouse e testes visuais, na ordem do CI |
| `npm run prototype` | Protótipo da fase 2 em http://localhost:4322 |

## Fluxo de trabalho
1. Confira a fase atual em `docs/ROADMAP.md` e trabalhe só nela.
2. Antes de implementar algo visual ou interativo, confira `DESIGN.md` e `INTERACTIONS.md`.
3. Ao terminar, rode o checklist "Definition of Done" de `QUALITY_GATES.md` e relate o que foi verificado e o que não foi.
4. Decisão nova ou que contraria um ADR → proponha um ADR e peça aprovação antes de seguir.
