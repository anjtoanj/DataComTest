import { expect, test } from "@playwright/test";

test("Click button shows success but JS error occurs", async ({ page }) => {
  // Attach listener BEFORE action

  const errors: Error[] = []; // Declare an empty array
  page.on("pageerror", (error) => {
    errors.push(error); // To capture JS errors, attached pageerror event listener and push the error into an array to keep track of all the errors happening
  });

  // Open the local HTML page
  await page.goto("file://" + __dirname + "/test-error-page.html");
  //__dirname – is a read-only Node.js variable that gives the current directory path of the script.

  await page.click("#submitBtn");

  expect(errors).toHaveLength(0); // Assert that exactly one error was captured
  console.log(
    "Captured JS Errors:",
    errors.map((e) => e.message),
  );

  const message = await page.textContent("#message");
  expect(message).toBe("Form submitted successfully! ✅");
});
