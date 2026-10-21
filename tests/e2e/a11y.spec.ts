import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { A11Y_ROUTES } from './routes';

for (const route of A11Y_ROUTES) {
  // Papel noite (padrão) e washi (claro, escolhido pela alternância). Movimento reduzido para o
  // axe ler os títulos já pintados, sem a opacidade da animação.
  for (const theme of ['dark', 'light'] as const) {
    test(`${route} sem violações WCAG 2.2 A/AA (tema ${theme})`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
