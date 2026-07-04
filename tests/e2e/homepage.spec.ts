import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders hero, navigation, and key sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Premium tires");
    await expect(page.getByRole("link", { name: "Obsidian Tread" }).first()).toBeVisible();

    await expect(page.getByRole("heading", { name: "Featured Tires" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Featured Brands" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Trusted by drivers everywhere/i })).toBeVisible();
  });

  test("tire size search navigates to the catalog with query params", async ({ page }) => {
    await page.goto("/");

    await page.getByLabel("Width").click();
    await page.getByRole("option").first().click();
    await page.getByLabel("Aspect Ratio").click();
    await page.getByRole("option").first().click();
    await page.getByLabel("Diameter").click();
    await page.getByRole("option").first().click();
    await page.getByRole("button", { name: /search tires/i }).click();

    await expect(page).toHaveURL(/\/tires\?/);
    await expect(page.getByRole("heading", { name: /tires in size/i })).toBeVisible();
  });
});
