import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test("today page shows execution sections", async ({ page }) => {
  await login(page);

  await expect(page.getByText(/today's focus/i)).toBeVisible();
  await expect(page.getByText(/today's plan/i)).toBeVisible();
  await expect(page.getByText(/upcoming/i)).toBeVisible();
});
