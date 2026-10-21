import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// URL pública: SITE_URL quando houver domínio próprio; na Vercel, o domínio de produção do projeto.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

export default defineConfig({
  site,
  output: 'static',
  // URLs sem barra final (/registro), uma por página: evita conteúdo duplicado. Ver vercel.json.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [mdx(), react(), sitemap({ filter: (page) => !page.includes('/interno/') })],
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
    routing: { prefixDefaultLocale: false },
  },
  // Fontes auto-hospedadas pelo Astro (baixadas no build), com fallbacks métricos. ADR 008.
  // Orçamento: 5 arquivos (docs/QUALITY_GATES.md).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Kaushan Script',
      cssVariable: '--font-brush',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
    {
      // Só os glifos usados: a fonte japonesa inteira passa de 4 MB. Kanji novo entra aqui.
      provider: fontProviders.google(),
      name: 'Yuji Syuku',
      cssVariable: '--font-jp',
      weights: [400],
      styles: ['normal'],
      fallbacks: ['serif'],
      options: {
        experimental: { glyphs: ['序一二三四五壱弐参絵巻頁無アーヴィン・マルケス'] },
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Zen Kaku Gothic New',
      cssVariable: '--font-sans',
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
