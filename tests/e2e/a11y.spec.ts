import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { A11Y_ROUTES } from './routes';

for (const route of A11Y_ROUTES) {
  for (const scheme of ['light', 'dark'] as const) {
    test(`${route} sem violações WCAG 2.2 A/AA (tema ${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
