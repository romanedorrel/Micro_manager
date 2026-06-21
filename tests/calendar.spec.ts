import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test("calendar page renders week view", async ({ page }) => {
  await login(page);

  await page.getByRole("link", { name: /calendar/i }).click();
  await expect(page.getByText(/calendar/i).first()).toBeVisible();
  await expect(page.getByText(/mon|tue|wed|thu|fri/i).first()).toBeVisible();
});
