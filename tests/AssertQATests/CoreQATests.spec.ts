import { expect, Page, test } from "@playwright/test";
import { HomePage } from "../../pages/AssertQA/HomePageAssertQA";
//import { CoreQAServicePagesAssertQA } from "../../pages/AssertQA/CoreQAServicesAssertQA";
import { QAPractisePage } from "../../pages/AssertQA/QAPractisePage";

test.describe("Tests on Core QA Services", () => {
  let page: Page;
  let homePage: HomePage;
  // let coreQAServicePage: CoreQAServicePagesAssertQA;
  let automationQAPraticePage: QAPractisePage;

  // Run once before all tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    // coreQAServicePage = new CoreQAServicePagesAssertQA(page);
    automationQAPraticePage = new QAPractisePage(page);

    // Navigate to Home Page only once
    await homePage.navigateToHomePage();
  });

  // test("Validate AssertQA Home Page", async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   await homePage.navigateToHomePage();
  // });

  // test("Navigate to Core QA Services from Home Page", async () => {
  //   await homePage.clickExploreCoreQAServices();

  //   // Assert navigation success
  //   await expect(page).toHaveURL(/.*services#core-qa/);
  // });
  // test("Navigate to QA Consulting page", async () => {
  //   await coreQAServicePage.clickQAConsulting();
  //   // Assert navigation success
  //   await expect(coreQAServicePage.page).toHaveURL(
  //     "https://assertqa.com/services/qa-consulting",
  //   );
  // });
  //     test("Navigate to autoamtion Testing Practise page", async () => {
  //   await coreQAServicePage.clickQAConsulting();
  //   // Assert navigation success
  //   await expect(coreQAServicePage.page).toHaveURL(
  //     "https://assertqa.com/services/qa-consulting",
  //   );

  test("Navigate to automation Testing Practise page", async () => {
    await automationQAPraticePage.clickAutomationQAPractisePageLink();
    await page.waitForTimeout(3000);
  });

  // Close the page after all tests
  // test.afterAll(async () => {
  //   await page.close();
  // });
});
