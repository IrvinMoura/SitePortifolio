import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

test('página inicial tem as seções 00 a 05 na ordem', async ({ page }) => {
  await page.goto('/');
  const ids = await page
    .locator('main > section[id]')
    .evaluateAll((sections) => sections.map((s) => s.id));
  expect(ids).toEqual(['memoriais', 'como-trabalho', 'registro', 'sobre', 'contato']);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('sistemas web');
});

test('Fig. 0 mostra os dois estados, com quatro etapas cada', async ({ page }) => {
  await page.goto('/');
  for (const name of ['Como é hoje', 'Com um sistema']) {
    const list = page.getByRole('list', { name });
    await expect(list).toBeVisible();
    await expect(list.getByRole('listitem')).toHaveCount(4);
  }
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
