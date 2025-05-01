import { Page, Locator } from "@playwright/test";

export class VisualTestingGifPage {
  private page: Page;

  // Locators
  gifImage = "#dynamic-gif";

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the registration page
  async navigate() {
    await this.page.goto("https://qa-practice.netlify.app/visual");
  }

  async checkOnGifImage(): Promise<string[]> {
    // Check if an image is visible
    const gif = await this.page.locator(this.gifImage).isVisible();

    // Check if image is gif
    // const gifOrNot =
    //   (await this.page.locator(this.gifImage).getAttribute("src"))
    //     ?.toLowerCase()
    //     .endsWith(".gif") ?? false;

    return [
      gif.toString(), //, gifOrNot.toString()
    ]; // gif returns a boolean value which is converted to string ("true / false"), gifOrNot returns a boolean value indicating if it's a gif
  }
}
