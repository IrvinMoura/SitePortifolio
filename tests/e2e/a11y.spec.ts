import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { A11Y_ROUTES } from './routes';

for (const route of A11Y_ROUTES) {
  // Movimento reduzido para o axe ler os títulos já pintados, sem a opacidade da animação.
  test(`${route} sem violações WCAG 2.2 A/AA`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
