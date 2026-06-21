import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test("Verify login", async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/today/);
  await expect(page.getByText(/today's focus/i)).toBeVisible();
});

test("user can log out", async ({ page }) => {
  await login(page);

  await page
    .getByRole("button", {
      name: /log out/i,
    })
    .click();

  await expect(page).toHaveURL(/login/);
});
