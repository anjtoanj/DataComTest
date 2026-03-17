import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // ===== Locators =====
  readonly btnExploreServices: Locator;
  readonly btnGetStarted: Locator;
  readonly heroTitle: Locator;
  readonly CoreQAServices: Locator;
  readonly ProfessionalQAServices: Locator;
  readonly AssertQALabs: Locator;
  readonly navMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hero section
    this.heroTitle = page.locator('[data-cy="hero-title"]');

    // Buttons
    this.btnExploreServices = page.getByRole("button", {
      name: /Explore Services/i,
    });
    this.btnGetStarted = page.getByRole("button", { name: /Get Started/i });

    // Sections
    this.CoreQAServices = page.getByText("Core QA Services").first();
    this.ProfessionalQAServices = page.getByText("Professional QA Services");
    this.AssertQALabs = page.getByText("AssertQA Labs");

    // Navigation (generic)
    this.navMenu = page.locator("nav");
  }

  // ===== Actions =====

  async navigateToHomePage() {
    await this.page.goto("https://assertqa.com/");
  }

  async clickExploreCoreQAServices() {
    // Wait until visible
    await this.CoreQAServices.waitFor({ state: "visible" });

    // Click
    await this.CoreQAServices.click();
  }

  async clickGetStarted() {
    await this.btnGetStarted.first().click();
  }

  // ===== Assertions =====

  async verifyHomePageLoaded() {
    await expect(this.heroTitle).toBeVisible();
  }
}
