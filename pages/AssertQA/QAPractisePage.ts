import { Page, Locator } from "@playwright/test";

export class QAPractisePage {
  readonly page: Page;

  // ===== Locators =====
  readonly automationQApractisePageLink: Locator;
  readonly webTablePagelink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.automationQApractisePageLink = page.locator(
      'a[data-cy="practice-hero-automation-cta"]',
    );
    this.webTablePagelink = page.locator('a[href="/practice/webtables"]');
  }

  async clickWebTablePageLink() {
    // Wait for element to appear in DOM and be visible
    await this.webTablePagelink.waitFor({ state: "visible" });

    // Scroll element into view
    await this.webTablePagelink.scrollIntoViewIfNeeded();
    // Click the element
    await this.webTablePagelink.click();
  }
}
