//Environment variables are loaded from the .env file using dotenv package
import dotenv from 'dotenv';

dotenv.config();
// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({

  testDir: './tests',

  // Maximum time for one test
  timeout: 120000,

  expect: {
    timeout: 10000,
  },

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left in the code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Workers on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['html'],
    ['list'],
  ],

  // Shared settings
  use: {
    // baseURL: 'https://your-url.com',
    baseURL: process.env.BASE_URL,

    headless: false,

    viewport: {
      width: 1536,
      height: 864,
    },

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    acceptDownloads: true,

    actionTimeout: 30000,

    navigationTimeout: 60000,

    ignoreHTTPSErrors: true,
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    // Uncomment if required

    // {
    //   name: 'Google Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome',
    //   },
    // },

    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },
  ],

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});