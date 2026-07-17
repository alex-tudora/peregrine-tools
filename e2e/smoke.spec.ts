import { test, expect } from "@playwright/test";

test("homepage lists tool categories", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("One domain");
  await expect(page.getByRole("heading", { name: "Developer" })).toBeVisible();
});

test("word counter counts words as you type", async ({ page }) => {
  await page.goto("/text/word-counter");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Word Counter");

  await page.getByRole("textbox").first().fill("the quick brown fox jumps");

  // Empty-state prompt disappears and the stats grid (with a "Words" card) shows.
  await expect(page.getByText("Words", { exact: true })).toBeVisible();
});

test("json formatter formats and validates input", async ({ page }) => {
  await page.goto("/dev/json-formatter");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("JSON Formatter");

  await page.getByRole("textbox").first().fill('{"name":"peregrine","n":1}');
  await page.getByRole("button", { name: "Format", exact: true }).click();

  // Formatted output renders (the Copy control and the key/value only appear
  // once a valid parse produces output).
  await expect(page.getByRole("button", { name: "Copy", exact: true })).toBeVisible();
  // The formatted output highlights the string value as a distinct token.
  await expect(page.getByText('"peregrine"', { exact: true })).toBeVisible();
});

test("json formatter surfaces an error on invalid JSON", async ({ page }) => {
  await page.goto("/dev/json-formatter");
  await page.getByRole("textbox").first().fill("{ not valid json");
  await page.getByRole("button", { name: "Format" }).click();
  await expect(page.getByText("Error:")).toBeVisible();
});
