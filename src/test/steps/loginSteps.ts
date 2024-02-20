import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { pageFixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

Given('User navigates to the application', async function () {
  await pageFixture.page.goto("https://bookcart.azurewebsites.net/login");
});

Given('User click on the login link', async function () {
  await pageFixture.page.click("(//span[text()='Login'])[1]");
});

Given('User enter the username as {string}', async function (username: string) {
  await pageFixture.page.locator("input[formcontrolname='username']").fill(username);
});
      
Given('User enter the password as {string}', async function (password: string) {
  await pageFixture.page.locator("input[formcontrolname='password']").fill(password);
});
      
When('User click on the login button', async function () {
  await pageFixture.page.click("button[color='primary']");   
  await pageFixture.page.waitForLoadState(); 
  await pageFixture.page.waitForTimeout(2000); 
});
      
Then('Login should be success', async function () {
  await pageFixture.page.waitForTimeout(3000);
  const locator = pageFixture.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]");
  await expect(locator).toBeVisible();
  const userName = await locator.textContent();
  console.log("Username: " + userName);
});
      
When('Login should fail', async function () {
  await pageFixture.page.waitForTimeout(1000);
  const failureMessage = pageFixture.page.locator("//*[@id='mat-error-0']");
  await expect(failureMessage).toBeVisible();
});
