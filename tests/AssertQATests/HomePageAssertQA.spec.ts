import { expect, Page, test } from "@playwright/test";
import { HomePage } from "../../pages/AssertQA/HomePageAssertQA";
test.describe("AssertQA Home Page Tests - Same Page", () => {
  let page: Page;
  let homePage: HomePage;

  // Run once before all tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);

    // Navigate to Home Page only once
    await homePage.navigateToHomePage();
  });

  test("Validate AssertQA Home Page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Navigate to Core QA Services from Home Page", async () => {
    await homePage.clickExploreCoreQAServices();

    // Optionally assert navigation success
    // await expect(page).toHaveURL(/.*services#core-qa/);
  });

  // Close the page after all tests
  test.afterAll(async () => {
    await page.close();
  });
});
