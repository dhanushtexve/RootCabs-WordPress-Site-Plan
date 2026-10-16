import { defineConfig } from '@playwright/test';
import { resolve } from 'node:path';
export default defineConfig({
  testDir: '.', testMatch: 'regression.spec.mjs', workers: 1, timeout: 45000,
  outputDir: '../dist/browser-test-artifacts',
  reporter: [['list'], ['json', { outputFile: resolve('dist/browser-regression.json') }]],
  use: { baseURL: 'http://127.0.0.1:4175', headless: true, launchOptions: { executablePath: process.env.PRERENDER_BROWSER_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' } },
  webServer: { command: 'node tests/serve-build.mjs', url: 'http://127.0.0.1:4175', reuseExistingServer: false, cwd: process.cwd() },
});
