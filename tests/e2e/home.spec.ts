import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

test('página inicial tem a abertura e as cenas um a quatro na ordem', async ({ page }) => {
  await page.goto('/');
  const ids = await page
    .locator('main > section[id]')
    .evaluateAll((sections) => sections.map((s) => s.id));
  expect(ids).toEqual(['projetos', 'o-que-faco', 'sobre', 'contato']);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Irvin Marques');
});

test('cada projeto abre a página do seu memorial', async ({ page }) => {
  await page.goto('/');
  const work = page.locator('#projetos a[data-gate]').first();
  await expect(work).toHaveAttribute('href', '/memoriais/este-site');
  await work.click();
  await expect(page).toHaveURL(/\/memoriais\/este-site/);
});

test('miniatura do projeto carrega dentro do portão', async ({ page }) => {
  await page.goto('/');
  const img = page.locator('#projetos .torii-view img').first();
  await expect(img).not.toHaveAttribute('loading', 'lazy');
  await img.scrollIntoViewIfNeeded();
  await expect
    .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
    .toBeGreaterThan(0);
  const box = await img.boundingBox();
  expect(box?.width).toBeGreaterThan(50);
});

test('pergaminho do Sobre abre e enrola pelo botão', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('[data-maki-toggle]');
  const paper = page.locator('#maki-paper');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(async () => (await paper.boundingBox())?.height ?? 0).toBeLessThan(20);
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveText('Enrolar');
  await expect.poll(async () => (await paper.boundingBox())?.height ?? 0).toBeGreaterThan(200);
  await toggle.click();
  await expect(toggle).toHaveText('Clique aqui');
});

test('sem JavaScript o pergaminho aparece aberto e sem botão', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-maki-toggle]')).toBeHidden();
  expect((await page.locator('#maki-paper').boundingBox())?.height ?? 0).toBeGreaterThan(200);
  await context.close();
});

test('títulos pintados mantêm o texto inteiro', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'O que eu faço', level: 2 })).toBeVisible();
  await expect(page.locator('#h-sobre')).toHaveText('O pintor da obra');
});

test('as etapas de um projeto são uma lista de cinco itens', async ({ page }) => {
  await page.goto('/');
  const strip = page.getByRole('list', { name: 'Como um projeto anda' });
  await expect(strip.getByRole('listitem')).toHaveCount(5);
});

test('dados estruturados da pessoa são JSON válido', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  const data = JSON.parse(raw ?? '');
  expect(data['@type']).toBe('Person');
  expect(data.name).toBe('Irvin Marques');
});

for (const route of ROUTES) {
  test(`${route}: links internos e âncoras levam a algum lugar`, async ({ page, request }) => {
    await page.goto(route);
    const hrefs = await page
      .locator('a[href^="/"], a[href^="#"]')
      .evaluateAll((links) => [...new Set(links.map((a) => (a as HTMLAnchorElement).href))]);
    for (const href of hrefs) {
      const url = new URL(href);
      const response = await request.get(url.pathname);
      expect(response.status(), href).toBe(200);
      if (url.hash) {
        await page.goto(url.pathname);
        const id = decodeURIComponent(url.hash.slice(1));
        await expect(page.locator(`[id="${id}"]`), href).toHaveCount(1);
      }
    }
  });

  test(`${route}: sem espaço antes de pontuação no texto`, async ({ page }) => {
    await page.goto(route);
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/\S [,.;:](?=\s|$)/m);
    // Palavra colada em link ou destaque ("estruturando a<strong>"): espaço engolido no build.
    const html = await page.locator('main').innerHTML();
    expect(html).not.toMatch(/\p{L}<(a|strong|em|code)\b/u);
  });
}
