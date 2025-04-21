import { Page, Locator } from "@playwright/test";

export class RegistrationPage {
  private page: Page;

  // Locators
  firstName = "#firstName";
  lastName = "#lastName";
  phoneNumber = "#phone";
  countryName = "#countries_dropdown_menu";
  email = "#emailAddress";
  password = "#password";
  termsCheckbox = "#exampleCheck1";
  registrationBtn = "#registerBtn";
  message = "#message";
  registrationResult = "#results-section";
  ResultfirstName = "#resultFn";
  ResultlastName = "#resultLn";
  ResultphoneNumber = "#resultPhone";
  Resultcountry = "#country";
  Resultemail = "#resultEmail";
  Resultpassword = "#resultPassword";

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the registration page
  async navigate() {
    await this.page.goto("https://qa-practice.netlify.app/bugs-form");
  }

  // Fill the registration form
  async fillForm(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
  ) {
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.phoneNumber).fill(phoneNumber);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.password).fill(password);
  }

  // Scroll and select the country from the dropdown list
  async selectCountry(country: string) {
    try {
      if (!country || country.trim() === "") {
        console.warn("Country is blank. Skipping country selection.");
        return; // Exit the method if the country is blank
      }

      await this.page.selectOption(this.countryName, {
        value: country,
      });
      await this.page.waitForTimeout(3000); // Optional delay
    } catch (error) {
      console.warn(`Error selecting country "${country}":`, error.message);
    }
  }

  // Accept terms and conditions
  async acceptTermsAndConditions(accept: boolean) {
    try {
      const isEnabled = await this.page.locator(this.termsCheckbox).isEnabled();
      if (!isEnabled) {
        throw new Error("The terms and conditions checkbox is disabled.");
      }

      if (accept) {
        await this.page.locator(this.termsCheckbox).check(); // Check the checkbox if true
        const isChecked = await this.page
          .locator(this.termsCheckbox)
          .isChecked();
        if (!isChecked) {
          throw new Error("Failed to check the terms and conditions checkbox.");
        }
      }
    } catch (error) {
      console.warn("Error in acceptTermsAndConditions:", error.message);
    }
  }

  // Submit the registration form
  async register() {
    await this.page.locator(this.registrationBtn).click();
  }

  // Get the message displayed after form submission
  async getMessage(): Promise<string> {
    const messageText = await this.page.locator(this.message).textContent();
    return messageText?.trim() || "";
  }

  // Get the registration result
  async getRegistrationResult(): Promise<string> {
    const ResultFirstName = await this.page
      .locator(this.ResultfirstName)
      .textContent();
    const ResultLastName = await this.page
      .locator(this.ResultlastName)
      .textContent();
    const ResultPhoneNumber = await this.page
      .locator(this.ResultphoneNumber)
      .textContent();
    const ResultCountry = await this.page
      .locator(this.Resultcountry)
      .textContent();
    const ResultEmail = await this.page.locator(this.Resultemail).textContent();
    // Return an array of trimmed values
    return [
      ResultFirstName?.trim() || "",
      ResultLastName?.trim() || "",
      ResultPhoneNumber?.trim() || "",
      ResultCountry?.trim() || "",
      ResultEmail?.trim() || "",
    ].join(", ");
  }
}
