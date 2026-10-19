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
  // Fontes auto-hospedadas pelo Astro (baixadas no build), com fallbacks métricos.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces',
      cssVariable: '--font-serif',
      // Pesos estáticos: a versão variável (eixo opsz) passa de 120 KB e estoura o orçamento de fontes.
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist',
      cssVariable: '--font-sans',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
