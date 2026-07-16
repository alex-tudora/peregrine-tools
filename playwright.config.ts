import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke-test config. Boots the consolidation PoC app (`one`), which mounts real
 * spoke-site tools, and drives a couple of them end-to-end. This is the first
 * automated test in the repo — a floor, not full coverage: it proves the app
 * builds, serves, and that representative tools actually process input.
 */
const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    // In CI `playwright install` provides a matching browser. For sandboxes with a
    // pre-installed Chromium at a different build, point PW_CHROMIUM_PATH at it.
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : undefined,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm --filter one build && pnpm --filter one start --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
