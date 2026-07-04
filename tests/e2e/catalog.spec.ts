import { expect, test } from "@playwright/test";

test.describe("Tire catalog", () => {
  test("filters results by season", async ({ page }) => {
    await page.goto("/tires");
    await expect(page.getByRole("heading", { name: "Shop All Tires" })).toBeVisible();

    const initialCount = await page.locator("text=/\\d+ tires found/").textContent();

    await page.getByLabel("Winter").check();
    await expect(page.locator("text=/\\d+ tires found/")).not.toHaveText(initialCount ?? "");
  });

  test("sorts results by price", async ({ page }) => {
    await page.goto("/tires");
    await page.getByRole("combobox").filter({ hasText: "Most Relevant" }).click();
    await page.getByRole("option", { name: "Price: Low to High" }).click();
    await expect(page).toHaveURL(/\/tires/);
  });

  test("opens a product detail page from the grid", async ({ page }) => {
    await page.goto("/tires");
    const firstProductLink = page.locator('a[href^="/tires/"]').first();
    const href = await firstProductLink.getAttribute("href");
    await firstProductLink.click();
    await expect(page).toHaveURL(new RegExp(href ?? "/tires/"));
    await expect(page.getByRole("button", { name: /add to cart/i }).first()).toBeVisible();
  });
});
