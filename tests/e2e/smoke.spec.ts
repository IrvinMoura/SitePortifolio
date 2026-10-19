import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

for (const route of ROUTES) {
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

test('Memorial 001 declara a natureza do projeto', async ({ page }) => {
  await page.goto('/memoriais/este-site');
  await expect(page.getByText('Projeto próprio')).toBeVisible();
});

test('/memoriais não existe com menos de 3 memoriais', async ({ page }) => {
  const response = await page.goto('/memoriais');
  expect(response?.status()).toBe(404);
});

test('conteúdo visível com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});

test('alternar tema troca o tema e persiste entre páginas', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Tema escuro' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/registro');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('índice do memorial marca a seção atual', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/memoriais/este-site#para-quem');
  await expect(page.locator('.toc a[aria-current="true"]')).toHaveText(/Para quem/);
});

test('página interna de componentes não entra no sitemap', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap-0.xml')).text();
  expect(sitemap).not.toContain('/interno/');
});
