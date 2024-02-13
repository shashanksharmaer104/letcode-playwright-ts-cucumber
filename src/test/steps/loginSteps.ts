import { Given, When, Then } from "@cucumber/cucumber"
import { chromium, Page, Browser, expect } from "@playwright/test"

let browser: Browser;
let page: Page;

Given('User navigates to the application', async function () {
  browser = await chromium.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto("https://bookcart.azurewebsites.net/login");
});

Given('User click on the login link', async function () {
  await page.click("(//span[text()='Login'])[1]");
});

Given('User enter the username as {string}', async function (username) {
  await page.locator("input[formcontrolname='username']").fill(username);
});
      
Given('User enter the password as {string}', async function (password) {
  await page.locator("input[formcontrolname='password']").fill(password);
});
      
When('User click on the login button', async function () {
  await page.click("button[color='primary']");     
});
      
Then('Login should be success', async function () {
  await page.waitForTimeout(3000);
  const text = page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent;
  console.log("Username is: " + text);
  await browser.close();
});
      
When('Login should fail', async function () {
  await page.waitForTimeout(1000);
  const failureMessage = page.locator("//*[@id='mat-error-0']");
  await expect(failureMessage).toBeVisible();
  await browser.close();
});