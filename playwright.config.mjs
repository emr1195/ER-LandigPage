import {defineConfig} from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.mjs',
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  expect: {timeout: 10000},
  use: {
    baseURL: 'http://127.0.0.1:3410',
    channel: 'chrome',
    trace: 'retain-on-failure',
  },
  reporter: [['list']],
  webServer: {
    command: 'node tests/support/run-stack.mjs',
    url: 'http://127.0.0.1:3410/api/health',
    reuseExistingServer: false,
    timeout: 120000,
  },
})
