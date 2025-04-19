import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import dataArray from "../testdata/testData1.json";

test.describe("Registration Form Validation", () => {
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    regPage = new RegistrationPage(page);
    await regPage.navigate();
  });

  for (const data of dataArray) {
    test(data.testCase, async ({ page }) => {
      regPage = new RegistrationPage(page);
      await regPage.navigate();

      await regPage.fillForm(
        data.firstName,
        data.lastName,
        data.phoneNumber,
        data.email,
        data.password
      );

      if (data.country) {
        await regPage.selectCountry(data.country);
      }

      if (data.terms) {
        await regPage.acceptTermsAndConditions(JSON.parse(data.terms));
      }

      await regPage.register();

      const message = await regPage.getMessage();
      expect(message).toEqual(data?.expectedMessage ?? "");

      const registrationResult = await regPage.getRegistrationResult();
      console.log(
        `TC: ${data.testCase} - Validate the registration result:`,
        registrationResult
      );

      expect(registrationResult).toEqual([
        data.firstName,
        data.lastName,
        data.phoneNumber,
        data.country || "", // Handle blank country
        data.email,
      ]);
    });
  }
});
