import { defineConfig, devices } from '@playwright/test';

// Porta própria para nunca reaproveitar o servidor de desenvolvimento (4321).
const PORT = 4400;
const e2e = /e2e[\\/].*\.spec\.ts/;
const visual = /visual[\\/].*\.spec\.ts/;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  // Referências visuais variam por sistema operacional (renderização de fonte);
  // por isso ficam separadas por plataforma e os testes visuais rodam só localmente.
  snapshotPathTemplate: '{testDir}/visual/__screenshots__/{platform}/{projectName}/{arg}{ext}',
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: 'disabled' },
  },
  projects: [
    { name: 'desktop', testMatch: e2e, use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', testMatch: e2e, use: { ...devices['Pixel 7'] } },
    { name: 'visual-desktop', testMatch: visual, use: { ...devices['Desktop Chrome'] } },
    { name: 'visual-mobile', testMatch: visual, use: { ...devices['Pixel 7'] } },
  ],
  // Testa o build (npm run build:test), não o servidor de desenvolvimento.
  webServer: {
    command: `npm run preview -- --port ${PORT}`,
    port: PORT,
    reuseExistingServer: false,
  },
});
