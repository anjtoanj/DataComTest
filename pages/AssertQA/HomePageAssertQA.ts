import { Page, Locator, expect } from "@playwright/test";
import { BASE_URL } from "../../config/env.config";

export class HomePage {
  readonly page: Page;

  // ===== Locators =====

  readonly heroTitle: Locator;
  readonly CoreQAServices: Locator;
  readonly ProfessionalQAServices: Locator;
  readonly AssertQALabs: Locator;
  readonly navMenu: Locator;
  readonly practisePageLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Hero section
    this.heroTitle = page.locator('[data-cy="hero-title"]');
    this.practisePageLink = page.locator('a[data-cy="desktop-nav-practice"]');

    // Sections
    this.CoreQAServices = page.getByText("Core QA Services").first();
    this.ProfessionalQAServices = page.getByText("Professional QA Services");
    this.AssertQALabs = page.getByText("AssertQA Labs");

    // Navigation (generic)
    this.navMenu = page.locator("nav");
  }

  // ===== Actions =====

  async navigateToHomePage() {
    await this.page.goto(BASE_URL);
  }

  async clickExploreCoreQAServices() {
    // Wait until visible
    await this.CoreQAServices.waitFor({ state: "visible" });
    // Click
    await this.CoreQAServices.click();
  }

  async clickPractisePageLink() {
    await this.practisePageLink.click();
  }

  //Assertions

  async verifyHomePageLoaded() {
    await expect(this.heroTitle).toBeVisible();
  }
}
