import { test as base, Page } from "@playwright/test";
import { HomePage } from "../../pages/AssertQA/HomePageAssertQA";
import { QAPractisePage } from "../../pages/AssertQA/QAPractisePage";

// Extend the base test to add our fixtures
type MyFixtures = {
  homePage: HomePage;
  // practisePage: PractisePageAssertQA;
  automationQAPractisePage: QAPractisePage;
};

export const test = base.extend<MyFixtures>({
  // Define the homePage fixture
  homePage: async ({ page }, use) => {
    console.log("HomePage fixture started");
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // Define the automationQAPractisePage fixture
  automationQAPractisePage: async ({ page, homePage }, use) => {
    console.log("PractisePage fixture started");
    const automationQAPractisePage = new QAPractisePage(page);
    await homePage.navigateToHomePage();
    await homePage.clickPractisePageLink();
    await automationQAPractisePage.automationQApractisePageLink.scrollIntoViewIfNeeded();
    await automationQAPractisePage.automationQApractisePageLink.click();
    await use(automationQAPractisePage);
  },


});

export { expect } from "@playwright/test";
