import { expect, test } from "@playwright/test";
import { VisualTestingGifPage } from "../pages/VisualTestingGifPage";

test.describe("TEST :Visual Testing - GIF Page ", () => {
  let visualPage: VisualTestingGifPage;

  test.beforeEach(async ({ page }) => {
    visualPage = new VisualTestingGifPage(page);
    await visualPage.navigate();
  });
  test(`Validate the image in the page`, async ({ page }) => {
    visualPage = new VisualTestingGifPage(page);
    await visualPage.navigate();

    // Check if the image is visible and if it's a GIF
    const [gif] = await visualPage.checkOnGifImage();
    expect(gif).toEqual("true");
    //  expect(gifOrNot).toEqual("true");
  });
});
