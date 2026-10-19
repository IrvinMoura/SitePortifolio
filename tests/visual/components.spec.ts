import { expect, test } from '@playwright/test';

// Referências visuais do sistema (fase 4). Rode `npm run test:visual:update` só quando a
// mudança visual for intencional, e revise as imagens no diff antes de commitar.
const PAGES = [
  { name: 'componentes', path: '/interno/componentes' },
  { name: 'memorial', path: '/memoriais/este-site' },
  { name: 'inicio', path: '/' },
];

for (const { name, path } of PAGES) {
  for (const scheme of ['light', 'dark'] as const) {
    test(`${name} — ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${name}-${scheme}.png`, { fullPage: true });
    });
  }
}
