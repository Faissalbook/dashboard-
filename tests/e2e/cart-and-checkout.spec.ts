import { expect, test } from "@playwright/test";

test.describe("Cart and checkout", () => {
  test("adding a tire to the cart updates the cart badge and cart page", async ({ page }) => {
    await page.goto("/tires");

    const firstCard = page.locator('a[href^="/tires/"]').first();
    const productName = await firstCard.locator("..").getByRole("link").nth(1).textContent();

    await page.getByRole("button", { name: /add to cart/i }).first().click();
    await expect(page.getByText(/added .* to cart/i)).toBeVisible();

    await page.goto("/cart");
    await expect(page.getByRole("heading", { name: "Your Cart" })).toBeVisible();
    if (productName) {
      await expect(page.getByText(productName.trim(), { exact: false }).first()).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /proceed to checkout/i })).toBeVisible();
  });

  test("completes the multi-step checkout flow to confirmation", async ({ page }) => {
    await page.goto("/tires");
    await page.getByRole("button", { name: /add to cart/i }).first().click();

    await page.goto("/checkout");

    // Step 1: Customer
    await page.getByLabel("Email address").fill("e2e-tester@example.com");
    await page.getByRole("button", { name: /continue to shipping/i }).click();

    // Step 2: Shipping
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
    await page.getByRole("button", { name: /continue to installation/i }).click();

    // Step 3: Installation (skip booking)
    await page.getByRole("button", { name: /continue to payment/i }).click();

    // Step 4: Payment
    await page.getByLabel("Name on card").fill("Alex Rivera");
    await page.getByLabel("Card number").fill("4242424242424242");
    await page.getByLabel("Expiry").fill("12/28");
    await page.getByLabel("CVC").fill("123");
    await page.getByRole("button", { name: /review order/i }).click();

    // Step 5: Review + place order
    await page.getByRole("button", { name: /place order/i }).click();

    await expect(page).toHaveURL(/\/checkout\/confirmation\//, { timeout: 15000 });
    await expect(page.getByRole("heading", { name: /order confirmed/i })).toBeVisible();
  });
});
