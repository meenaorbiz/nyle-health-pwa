import { defineConfig, devices } from "@playwright/test";

const targetUrl = process.env.BASE_URL || "http://localhost:3000";
const isRemote = !!process.env.BASE_URL;
const slowMoDelay = process.env.SLOW_MO ? parseInt(process.env.SLOW_MO, 10) : 0;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: targetUrl,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: slowMoDelay,
    },
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],

  webServer: isRemote
    ? undefined
    : {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
      },
});
