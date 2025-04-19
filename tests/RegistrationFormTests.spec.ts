import { test, expect } from "playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import dataArray from "../testdata/testData1.json";

test.describe("Registration Form Validation", () => {
  let regPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    regPage = new RegistrationPage(page);
    await regPage.navigate();
  });

  dataArray.forEach((data) => {
    test(data.testCase, async ({ page }) => {
      await regPage.fillForm(
        data.firstName,
        data.lastName,
        data.phoneNumber,
        data.email,
        data.password
      );
      await regPage.selectCountry(data.country);
      // Call acceptTermsAndConditions only if data.terms is present
      if (data.terms) {
        await regPage.acceptTermsAndConditions(JSON.parse(data.terms));
      }
      await regPage.register();
      const message = await regPage.getMessage();
      expect(message).toEqual(data.expectedMessage);

      // Get the registration result
      const registrationResult = await regPage.getRegistrationResult();
      // Validate the registration result
      console.log(
        "TC15: Validate the registration result:",
        registrationResult
      );

      // Handle null or blank country
      const expectedCountry = data.country || ""; // Replace null with an empty string
      if (!data.country && registrationResult.includes(expectedCountry)) {
        throw new Error(
          `Validation failed: Country is not displayed as blank in the result set. Expected: "${expectedCountry}", Got: "${registrationResult}"`
        );
      }

      expect(registrationResult).toBe([
        data.firstName,
        data.lastName,
        data.phoneNumber,
        data.country,
        data.email,
      ]);
    });
  });
});
