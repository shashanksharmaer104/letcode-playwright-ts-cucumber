import {Given, When, Then } from '@cucumber/cucumber'
import RegisterPage from '../../pages/registerPage';
import { pageFixture } from '../../hooks/pageFixture';
import { expect } from '@playwright/test';

let registerPage: RegisterPage;
       
Given('User navigate to registartion', async function () {
    registerPage = new RegisterPage(pageFixture.page);
    await registerPage.navigateToRegisterPage();
});
       
When('User register with all details', async function () {
    const username = "te_" + Date.now().toString();
    await registerPage.registerUser("firstname", "lastname", username, "Pass@123", "Pass@123", "m");
});
       
Then('User should be able to see success message', async function () {
    // need to implement yet
    await pageFixture.page.waitForTimeout(2000);
    expect(pageFixture.page).toHaveURL("https://bookcart.azurewebsites.net/login");
});