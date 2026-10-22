# Arquitetura técnica

> Stack, estrutura, modelo de conteúdo e arquitetura de informação. Mudanças de stack exigem ADR.
> Versões conferidas no npm em 18/10/2026; fixar versões exatas no `package.json` da fase 3.

## Visão geral
Site **estático** gerado pelo Astro, servido por CDN. Sem servidor, banco ou autenticação. JavaScript só nas **ilhas** que precisam de interação (figuras), carregadas quando visíveis.

```
MDX (conteúdo) ──► Astro build (SSG) ──► HTML/CSS estático + ilhas React ──► CDN
                          │
                          └─ validação de schema (Zod), OG images, sitemap
```

## Stack
| Camada | Escolha | Versão ref. | ADR |
|---|---|---|---|
| Framework | Astro (saída `static`) | 7.4 | [002](decisions/002-astro-ilhas-react.md) |
| Linguagem | TypeScript `strict` | — | 002 |
| Ilhas interativas | React (`@astrojs/react`) | — | 002 |
| Conteúdo | Content collections + MDX (`@astrojs/mdx`) | 8.1 | [004](decisions/004-conteudo-mdx.md) |
| Fontes | API de fontes do Astro (provider Fontsource): Fraunces, Geist, Geist Mono, baixadas no build e servidas pelo próprio site, com fallbacks métricos | — | — |
| Estilo | CSS moderno: tokens em custom properties, `@layer`, container queries, `oklch` | — | [003](decisions/003-css-tokens.md) |
| Motion | CSS nativo → Motion (`motion`) nas ilhas | 14.3 | [005](decisions/005-motion.md) |
| Testes | Vitest · Playwright · @axe-core/playwright · Lighthouse CI | PW 1.64 / axe 4.14 | — |
| Qualidade de código | `astro check`, ESLint, Prettier | — | — |
| Hospedagem | Vercel (produção em `main`, preview por PR) | — | [007](decisions/007-hospedagem-vercel.md) |
| Analytics | Vercel Web Analytics ou Umami (sem cookies) | — | pendente (fase 10) |
| CI | GitHub Actions | — | — |

**Não usar sem novo ADR:** Lenis/smooth scroll, Three.js/R3F, GSAP, Tailwind, bibliotecas de UI, CMS, backend.

## Estrutura de pastas (alvo)
```
/
├─ AGENTS.md · CLAUDE.md · README.md
├─ docs/                     documentação e ADRs
├─ public/                   favicon, currículo PDF
├─ vercel.json               cabeçalhos de segurança e cache
├─ src/
│  ├─ content/
│  │  ├─ memoriais/          dados de cada projeto em .mdx, só frontmatter (ADR 009)
│  │  ├─ registro.json       entradas do changelog/diário (loader file())
│  │  └─ schemas.ts          schemas Zod puros (testados com Vitest)
│  ├─ content.config.ts      schemas Zod das collections
│  ├─ components/
│  │  ├─ base/               Button, SkipLink, InkScript, SmokeBackground…
│  │  ├─ home/               Scene, ProjectGates, ToriiGate, Makimono
│  │  ├─ memorial/           Section, MarginNote, SpecSheet, NatureBadge, LogList
│  │  └─ islands/            componentes React interativos (figuras)
│  ├─ layouts/               BaseLayout
│  ├─ pages/                 rotas (ver abaixo)
│  ├─ styles/                base.css (camadas), tokens.css, layout.css, typography.css
│  ├─ i18n/                  strings de UI (pt-BR agora, en depois)
│  └─ lib/                   utilitários puros (testados com Vitest)
└─ tests/
   ├─ e2e/                   Playwright (fluxos, teclado, reduced motion)
   ├─ a11y/                  axe por rota
   └─ visual/                screenshots de referência
```

## Arquitetura de informação

| Rota | Conteúdo | Condição | Fase |
|---|---|---|---|
| `/` | 序 Abertura · 一 Projetos (cada portão abre o site do projeto) · 二 O que eu faço · 三 Sobre · 四 Contato | Projetos lista o que existir (no lançamento, só "este site") | MVP |
| `/privacidade`, `/termos` | Política de privacidade (LGPD) e termos de uso, linkados no rodapé | — | MVP |
| `/lab`, `/notas`, `/en/…` | Experimentos, artigos, inglês | Quando houver conteúdo | Pós-MVP |
| `404`, `sitemap.xml`, `robots.txt` | Infra | — | MVP |

Contato é a seção `#contato` da home (sem página própria no MVP). `/sobre` e `/registro` saíram em 21/10/2026; a Vercel redireciona para a home (vercel.json).

**Regra de renderização condicional:** componentes de lista recebem a collection filtrada e **não renderizam nada** (nem título) quando ela está vazia.

## Modelo de conteúdo

### `memoriais` (esboço do schema)
```ts
{
  title: string,
  slug: string,
  summary: string,              // 1 frase em linguagem de negócio
  nature: 'cliente' | 'academico' | 'demonstrativo' | 'proprio' | 'open-source',
  status: 'em-producao' | 'prototipo' | 'arquivado' | 'em-andamento',
  role: string,                 // ex.: "Design e desenvolvimento, solo"
  period: { start: Date, end?: Date },
  areas: ('site' | 'sistema' | 'dashboard' | 'automacao' | 'integracao' | 'ia')[],
  stack: string[],
  links?: { demo?: url, repo?: url },
  cover: image, coverAlt: string,
  metrics?: { label: string, value: string, source: url }[], // source obrigatório
  featured: boolean,
  draft: boolean,                // draft não é publicado em produção
}
```
Sem corpo MDX: o projeto não tem página própria; o card na home leva a `links.demo` ([ADR 009](decisions/009-projetos-direto-ao-site.md)). Checklist em [QUALITY_GATES.md](QUALITY_GATES.md) › checklist de projeto.

### `registro` (`src/content/registro.json`, uma entrada por objeto com `id`)
```ts
{ date: Date, type: 'site' | 'projeto' | 'estudo', title: string, link?: url }
```

## Ilhas
- Hidratação `client:visible` por padrão; `client:idle` só para a figura-assinatura, se o teste mostrar necessidade.
- Cada ilha recebe o fallback estático como conteúdo do servidor; o JS só melhora.
- Uma ilha não importa outra; o estado é local.

## i18n
- Roteamento i18n do Astro configurado desde o início: `pt-BR` padrão sem prefixo; `en` futuro em `/en/`.
- Strings de UI em `src/i18n/`; o conteúdo é traduzido por arquivo (ex.: `este-site.en.mdx`).

## SEO e compartilhamento
- `<title>` e description por página; canonical; `hreflang` quando houver `en`.
- OG image por página, gerada no build.
- JSON-LD: `Person` (home), `Article` ou `CreativeWork` (memoriais).
- `sitemap.xml` via `@astrojs/sitemap`; `robots.txt`.

## Segurança
- Cabeçalhos em `vercel.json` (HSTS já vem da Vercel): CSP sem `unsafe-inline` para scripts, HSTS, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restritiva.
- Dependências mínimas; Dependabot; `npm audit` no CI.
- Nenhum segredo no repositório (não há segredos previstos).

## Performance
Orçamentos em [QUALITY_GATES.md](QUALITY_GATES.md). Práticas: fontes auto-hospedadas com subset e `preload` só da fonte do hero; imagens via `astro:assets` (AVIF/WebP, dimensões explícitas); nenhuma ilha acima da dobra, exceto a figura-assinatura.
