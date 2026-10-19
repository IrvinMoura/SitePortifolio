# 007 — Hospedagem na Vercel
**Status:** Aceito · 18/10/2026

**Contexto:** site estático (ADR 002), código no GitHub, sem backend. Era preciso escolher entre Cloudflare Pages e Vercel para produção e deploys de preview.

**Decisão:** Vercel, conectada ao repositório do GitHub. `main` publica em produção; cada pull request ganha um deploy de preview. Configuração em `vercel.json` (cabeçalhos de segurança e cache). O `site` do Astro usa `SITE_URL` quando houver domínio próprio e, enquanto isso, o domínio de produção que a Vercel fornece (`VERCEL_PROJECT_PRODUCTION_URL`).

**Alternativas:** Cloudflare Pages (CDN e analytics gratuitos sem cookies; cabeçalhos via `_headers`). As duas atendem bem um site estático; a escolha foi do Irvin.

**Atualização (18/10/2026):** no primeiro deploy, `VERCEL_PROJECT_PRODUCTION_URL` apontou para `site-portifolio-pink.vercel.app` (que responde 404), não para `irvinmarques.vercel.app`. Por isso `SITE_URL` passa a ser **obrigatória** na Vercel (Settings → Environment Variables). URLs canônicas ficam sem barra final (`trailingSlash: never` + `build.format: file` no Astro, `trailingSlash: false` no `vercel.json`). O Lighthouse não detectou o canonical em domínio errado, então isso fica no checklist manual de lançamento.

**Consequências:** previews da Vercel recebem `X-Robots-Tag: noindex` automaticamente e HSTS já vem nos domínios da Vercel. O analytics sem cookies passa a ser Vercel Web Analytics ou Umami (decidir na fase 10).
