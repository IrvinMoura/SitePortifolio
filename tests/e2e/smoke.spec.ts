import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

for (const route of ROUTES) {
  test(`${route} não tem rolagem horizontal`, async ({ page }) => {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test(`${route} carrega com título, idioma e um único h1`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page).toHaveTitle(/Irvin Marques/);
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

test('o primeiro Tab foca o link "Pular para o conteúdo"', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
});

test('cada projeto na home declara a sua natureza', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#projetos').getByText('Projeto próprio')).toBeVisible();
});

test('não existem páginas de memorial', async ({ page }) => {
  for (const path of ['/memoriais', '/memoriais/este-site']) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
  }
});

test('conteúdo visível com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('h1 .w').first()).toHaveCSS('opacity', '1');
});

test('títulos visíveis sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('#h-contato')).toBeVisible();
  await context.close();
});

test('site só tem o papel noite, sem alternância de tema', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-theme-toggle]')).toHaveCount(0);
  const scheme = await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);
  expect(scheme).toBe('dark');
});

test('página interna de componentes não entra no sitemap', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  expect(sitemap).not.toContain('/interno/');
});
