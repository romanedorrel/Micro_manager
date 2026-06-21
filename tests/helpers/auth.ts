/// <reference types="node" />
import { Page } from "@playwright/test";

export async function login(page: Page) {
  console.log("Logging in...");
  await page.goto("/login");

  await page.getByPlaceholder("Email").fill(process.env.TEST_EMAIL!);

  await page.getByPlaceholder("Password").fill(process.env.TEST_PASSWORD!);

  await page
    .getByRole("button", {
      name: /log in/i,
    })
    .click();
}
