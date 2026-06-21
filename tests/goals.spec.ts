import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test("user can create a goal through the scheduler flow", async ({ page }) => {
  await login(page);

  const goalTitle = `E2E Goal ${Date.now()}`;

  // Open scheduler
  await page.getByRole("link", { name: /scheduler/i }).click();
  // Complete required fields
  await page
    .getByPlaceholder(/Become a Junior Software Engineer/i)
    .fill(goalTitle);

  await page.locator('input[type="date"]').fill("2026-07-31");

  // Generate suggestions
  await page
    .getByRole("button", {
      name: /generate suggestions/i,
    })
    .click();

  // User should be redirected to the goal detail page
  await expect(page).toHaveURL(/\/goals\/.+/, { timeout: 10000 });

  // At least one generated task should be present
  await expect(page.getByRole("checkbox").first()).toBeVisible();
});
