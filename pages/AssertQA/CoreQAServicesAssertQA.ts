import { Page, Locator, expect } from "@playwright/test";

export class CoreQAServicePagesAssertQA {
  readonly page: Page;

  // ===== Locators =====
  readonly qaConsultingLink: Locator;
  readonly qaParent: Locator;
  readonly learnMoreBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.qaConsultingLink = page
      .locator("#core-qa")
      .locator('a[href="/services/qa-consulting"]');
    this.qaParent = page.locator("#qa-consulting");
    this.learnMoreBtn = this.qaParent.locator(
      'a[href*="/services/qa-consulting"]',
    );
  }

  // ===== Actions =====
  async clickQAConsulting() {
    // Scroll the parent element into view
    await this.qaParent.scrollIntoViewIfNeeded();
    // Locate the "Learn More" button inside parent
    await expect(this.learnMoreBtn).toBeEnabled({ timeout: 1000 });

    // Click the button
    await this.learnMoreBtn.click();
  }
}

// NOTES
// We use this.page because:
// 👉 It refers to the current browser page instance that was passed into the Page Object class.
// 👉 It allows all methods inside the class to interact with the same page consistently.
